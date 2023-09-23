import { ParsedInstruction, ParsedTransactionWithMeta } from '@solana/web3.js';
import {
    BroadcastData,
    SolanaDatastoreName,
    SolanaTransactionMessage,
} from '../types';
import { SolanaProcessor } from './processor';
import { SolanaBlockModel } from 'types/src/models/solana/block';
import { SolanaAccountActivityModel } from 'types/src/models/solana/account_activity';
import {
    SolanaTransactionModel,
    SolanaVoteTransactionModel,
} from 'types/src/models/solana/transaction';

export class SolanaTransactionProcessor extends SolanaProcessor<SolanaTransactionMessage> {
    private readonly VOTE_PROGRAM_ID =
        'Vote111111111111111111111111111111111111111';

    protected async __process(
        data: BroadcastData<SolanaTransactionMessage>
    ): Promise<void> {
        const serviceProvider = await this.providers.serviceProvider();
        const logger = this.providers.logProvider();
        const blockDatastore = await this.providers.datastoreProvider(
            SolanaDatastoreName.BlockDatastore
        );
        const { index: txnIndex, signature } = data.payload;
        const txn = await serviceProvider.getTransaction(signature);

        if (!txn) {
            logger.warn(`Transaction not found: ${signature}`);
            return;
        }
        const blocks = await blockDatastore.find<
            SolanaBlockModel,
            { slot: number | bigint }
        >({ slot: txn!.slot });
        if (blocks.length === 0) {
            throw new Error(`Block not found: ${txn!.slot}`);
        }
        const block = blocks[0];
        const instructions = txn.transaction.message.instructions;
        if (instructions.length === 0) {
            logger.warn(`Transaction has no instructions: ${signature}`);
            return;
        }
        const firstInstruction = instructions[0];
        if (firstInstruction.programId.toString() === this.VOTE_PROGRAM_ID) {
            await this._processVoteTransaction(txnIndex, block, txn);
        } else {
            await this._processNonVoteTransaction(txnIndex, block, txn);
        }
        await this._processBalanceChangeInTransaction(txnIndex, block, txn);
        logger.info(`Transaction processed: ${signature}`);
    }

    private async _processBalanceChangeInTransaction(
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
                };

                return activity;
            }
        );
    }

    private async _updateBlockData(
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
            { slot: number | bigint },
            Partial<SolanaBlockModel>
        >(
            { slot: block.slot },
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

    private async _processVoteTransaction(
        txnIndex: number,
        block: SolanaBlockModel,
        txn: ParsedTransactionWithMeta
    ) {
        const logger = this.providers.logProvider();
        const voteTxnDatastore = await this.providers.datastoreProvider(
            SolanaDatastoreName.VoteTransactionDatastore
        );
        const voteInstruction = txn.transaction.message
            .instructions[0] as ParsedInstruction;
        const txnModel = this._getSolanaTxnModel(txnIndex, block, txn);
        (txnModel as any).instructions = undefined;
        const voteTxn: SolanaVoteTransactionModel = {
            ...txnModel,
            vote_account: voteInstruction!.parsed!.info!.voteAccount,
            vote_authority: voteInstruction!.parsed!.info!.voteAuthority,
            root_slot: voteInstruction!.parsed!.info!.voteStateUpdate!.root,
            root_timestamp: voteInstruction!.parsed!.info!.voteStateUpdate
                ? new Date(
                      voteInstruction!.parsed!.info!.voteStateUpdate!.timestamp
                  )
                : null,
        };
        await voteTxnDatastore.insert(voteTxn);
        logger.info(
            `Inserted vote transaction ${voteTxn.signature} into datastore`
        );
        await this._updateBlockData(block, {
            isTxnSuccess: txn.meta!.err === null,
            isVoteTxn: true,
        });
    }

    private _getInstructionId(
        txnId: string,
        index: number,
        innerIndex?: number
    ): string {
        if (innerIndex) {
            return `${txnId}.${index}.${innerIndex}`;
        }
        return `${txnId}.${index}`;
    }

    private _getSolanaTxnModel(
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

    private async _processNonVoteTransaction(
        txnIndex: number,
        block: SolanaBlockModel,
        txn: ParsedTransactionWithMeta
    ) {
        const logger = this.providers.logProvider();
        const txnDatastore = await this.providers.datastoreProvider(
            SolanaDatastoreName.TransactionDatastore
        );
        const txnModel = this._getSolanaTxnModel(txnIndex, block, txn);
        await txnDatastore.insert(txnModel);
        await this._updateBlockData(block, {
            isTxnSuccess: txn.meta!.err === null,
            isVoteTxn: false,
        });
        logger.info(
            `Inserted transaction ${txnModel.signature} into datastore`
        );
        //TODO: Instruction processor
    }
}
