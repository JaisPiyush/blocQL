import { ParsedInstruction, ParsedTransactionWithMeta } from '@solana/web3.js';
import {
    BroadcastData,
    SolanaDatBroadcastType,
    SolanaDatastoreName,
    SolanaTransactionMessage,
} from '../../types';
import { SolanaBlockModel } from 'types/src/models/solana/block';
import { SolanaVoteTransactionModel } from 'types/src/models/solana/transaction';
import { BaseSolanaTransactionProcessor } from './base';
import { SolanaProcessorProvider } from '../processor';
import { SolanaInstructionsProcessor } from '../instruction_processor';

export class SolanaTransactionProcessor extends BaseSolanaTransactionProcessor {
    private readonly instructionProcessor: SolanaInstructionsProcessor;
    constructor(providers: SolanaProcessorProvider) {
        super(providers);
        this.instructionProcessor = new SolanaInstructionsProcessor(providers);
    }

    protected async __process(
        data: BroadcastData<SolanaTransactionMessage>
    ): Promise<void> {
        const logger = this.providers.logProvider();
        try {
            const serviceProvider = await this.providers.serviceProvider();
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
            if (
                firstInstruction.programId.toString() === this.VOTE_PROGRAM_ID
            ) {
                await this._processVoteTransaction(txnIndex, block, txn);
            } else {
                await this._processNonVoteTransaction(txnIndex, block, txn);
            }
            await this._processBalanceChangeInTransaction(txnIndex, block, txn);
            logger.info(`Transaction processed: ${signature}`);
        } catch (err) {
            logger.error(
                `SolanaTransactionProcessor Error processing transaction ${data.payload.signature}: ${err}`
            );
        }
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
        await this.instructionProcessor.__process({
            target: SolanaDatBroadcastType.InstructionBroadcast,
            payload: {
                txnIndex,
                block,
                rawTxn: txn,
                txn: txnModel,
            },
        });
    }
}
