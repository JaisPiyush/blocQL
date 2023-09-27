import { SolanaBlockModel } from 'types/src/models/solana/block';
import { SolanaDatastoreName, SolanaTransactionMessage } from '../../types';
import { SolanaProcessor } from '../processor';
import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { SolanaAccountActivityModel } from 'types/src/models/solana/account_activity';
import { SolanaTransactionModel, SolanaVoteTransactionModel } from 'types/src/models/solana/transaction';

export class BaseSolanaTransactionProcessor extends SolanaProcessor<SolanaTransactionMessage> {
    protected readonly VOTE_PROGRAM_ID =
        'Vote111111111111111111111111111111111111111';

    /**
     *
     * @param block - block containing the transaction
     * @param data - data to update the block with
     */
    protected async _updateBlockData(
        block: SolanaBlockModel,
        data: {
            isTxnSuccess: boolean;
            isVoteTxn: boolean;
        }
    ) {
        const datastore = await this.providers.datastoreProvider(
            SolanaDatastoreName.BlockDatastore
        );
        const logger = this.providers.logProvider();

        await datastore.update<
            number | bigint ,
            Partial<SolanaBlockModel>
        >(
            block.slot,
            {
                tx_count: block.tx_count + 1,
                tx_success_count:
                    block.tx_success_count + (data.isTxnSuccess ? 1 : 0),
                tx_error_count:
                    block.tx_error_count + (data.isTxnSuccess ? 0 : 1),
                successful_vote_txn_count:
                    block.successful_vote_txn_count +
                    (data.isVoteTxn && data.isTxnSuccess ? 1 : 0),
                failed_vote_txn_count:
                    block.failed_vote_txn_count +
                    (data.isVoteTxn && !data.isTxnSuccess ? 1 : 0),
                successful_non_vote_txn_count:
                    block.successful_non_vote_txn_count +
                    (!data.isVoteTxn && data.isTxnSuccess ? 1 : 0),
                failed_non_vote_txn_count:
                    block.failed_non_vote_txn_count +
                    (!data.isVoteTxn && !data.isTxnSuccess ? 1 : 0),
                total_vote_txn_count:
                    block.total_vote_txn_count + (data.isVoteTxn ? 1 : 0),
                total_non_vote_txn_count:
                    block.total_non_vote_txn_count + (!data.isVoteTxn ? 1 : 0),
            }
        );
        logger.info(`Updated block data for slot ${block.slot}`);
    }

    /**
     * Insert the account activity for the transaction
     *
     * @param txnIndex - index of the transaction in the block
     * @param block - block containing the transaction
     * @param txn - transaction to process
     * @returns {}
     */
    protected async _processBalanceChangeInTransaction(
        txnIndex: number,
        block: SolanaBlockModel,
        txn: ParsedTransactionWithMeta
    ) {
        const datastore = await this.providers.datastoreProvider(
            SolanaDatastoreName.AccountActivityDatastore
        );
        const logger = this.providers.logProvider();
        if (txn.meta === null) {
            return;
        }
        const accountActivity = (txn.transaction.message.accountKeys || []).map(
            (accountKey, index) => {
                const preBalance = txn.meta!.preBalances[index];
                const postBalance = txn.meta!.postBalances[index];
                const account = txn.transaction.message.accountKeys![index];

                const activity: SolanaAccountActivityModel = {
                    address: accountKey.toString(),
                    balance_change: postBalance - preBalance,
                    block_date: block.block_date,
                    block_hash: block.block_hash,
                    block_time: block.block_time,
                    post_balance: postBalance,
                    pre_balance: preBalance,
                    signed: account.signer,
                    tx_id: txn.transaction.signatures[0],
                    tx_index: txnIndex,
                    tx_success: txn.meta!.err === null,
                    writable: account.writable,
                    slot: block.slot,
                    id: `${accountKey.toString()}.${txn.transaction.signatures[0]}`
                };

                return activity;
            }
        );
        if (accountActivity.length > 0) {
            await Promise.all(
                accountActivity.map(async (activity) => {
                    await datastore.insert(activity);
                })
            );
            
        }
        logger.info('Inserted account activity for transaction');
    }

    protected _getInstructionId(
        txnId: string,
        index: number,
        innerIndex?: number
    ): string {
        if (innerIndex) {
            return `${txnId}.${index}.${innerIndex}`;
        }
        return `${txnId}.${index}`;
    }

    protected _getSolanaTxnModel(
        txnIndex: number,
        block: SolanaBlockModel,
        txn: ParsedTransactionWithMeta
    ): SolanaTransactionModel {
        const txnError = txn.meta!.err as {
            InstructionError: [number, { Custom: number }];
        } | null;
        const signers = txn.transaction.message.accountKeys.filter(
            (accountKey) => accountKey.signer
        );
        return {
            signature: txn.transaction.signatures[0],
            slot: txn.slot,
            tx_index: txnIndex,
            signer: signers[0].pubkey.toString(),
            success: txn.meta!.err === null,
            block_time: block.block_time,
            block_date: block.block_date,
            fee: txn.meta!.fee,
            post_balances: txn.meta!.postBalances,
            pre_balances: txn.meta!.preBalances,
            signatures: txn.transaction.signatures,
            error: JSON.stringify(txn.meta!.err),
            block_hash: block.block_hash,
            required_signatures: txn.transaction.message.accountKeys.filter(
                (accountKey) => accountKey.signer
            ).length,
            recent_block_hash: txn.transaction.message.recentBlockhash,
            account_keys: txn.transaction.message.accountKeys.map(
                (accountKey) => accountKey.pubkey.toString()
            ),
            instructions: txn.transaction.message.instructions.map((_, index) =>
                this._getInstructionId(txn.transaction.signatures[0], index)
            ),
            error_code:
                txnError === null ? null : txnError.InstructionError[1].Custom,
            error_instruction_index:
                txnError === null ? null : txnError.InstructionError[0],
            error_program_id:
                txnError === null
                    ? null
                    : txn.transaction.message.instructions[
                          txnError.InstructionError[0]
                      ].programId.toString(),
            compute_unit_consumed: txn.meta!.computeUnitsConsumed,
        };
    }

    protected __getVoteTxnModelFromTxnModel(txn: SolanaTransactionModel): SolanaVoteTransactionModel {
        return {
            signature: txn.signature,
            slot: txn.slot,
            tx_index: txn.tx_index,
            signer: txn.signer,
            success: txn.success,
            block_time: txn.block_time,
            block_date: txn.block_date,
            fee: txn.fee,
            post_balances: txn.post_balances,
            pre_balances: txn.pre_balances,
            signatures: txn.signatures,
            error: txn.error,
            block_hash: txn.block_hash,
            required_signatures: txn.required_signatures,
            recent_block_hash: txn.recent_block_hash,
        };
    }
}
