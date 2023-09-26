import {
    ParsedAccountsModeBlockResponse,
    ParsedTransactionWithMeta,
} from '@solana/web3.js';
import { SolanaInstructionProcessorDecodedData } from 'types';
import { SolanaBlockModel } from 'types/src/models/solana/block';
import { SolanaTransactionModel } from 'types/src/models/solana/transaction';

export enum SolanaDataBroadcastType {
    BlockBroadcast = 'blockBroadCast',
    TokenBroadcast = 'tokenBroadcast',
    TransactionBroadcast = 'transactionBroadcast',
    InstructionBroadcast = 'instructionBroadcast',
}

export enum SolanaDatastoreName {
    BlockDatastore = 'blockDatastore',
    TransactionDatastore = 'transactionDatastore',
    TokenDatastore = 'tokenDatastore',
    RewardDatastore = 'rewardDatastore',
    AccountActivityDatastore = 'accountActivityDatastore',
    VoteTransactionDatastore = 'voteTransactionDatastore',
    InstructionDatastore = 'instructionDatastore',
}

export type SolanaBlockMessage = Omit<
    ParsedAccountsModeBlockResponse & { slot: number },
    'transactions'
>;

export type SolanaTransactionMessage = {
    index: number;
    signature: string;
};

export type SolanaInstructionsMessage = {
    txnIndex: number;
    block: SolanaBlockModel;
    rawTxn: ParsedTransactionWithMeta;
    txn: SolanaTransactionModel;
};

export type BroadcastData<T> = {
    target: SolanaDataBroadcastType;
    payload: T;
};

export interface SolanaInstructionDecoderFn {
    (data: string, arg?: any): SolanaInstructionProcessorDecodedData | null;
}
