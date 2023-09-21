import { ParsedAccountsModeBlockResponse } from "@solana/web3.js";


export enum SolanaDatBroadcastType {
    BlockBroadcast = 'blockBroadCast',
    TokenBroadcast = 'tokenBroadcast',
    TransactionBroadcast = 'transactionBroadcast',
}

export enum SolanaDatastoreName {
    BlockDatastore = 'blockDatastore',
    TransactionDatastore = 'transactionDatastore',
    TokenDatastore = 'tokenDatastore',
    RewardDatastore = 'rewardDatastore',
}

export type SolanaBlockMessage =  Omit<
    ParsedAccountsModeBlockResponse & {slot: number}, 
    'transactions'>;

export type BroadcastData<T> = {
    target: SolanaDatBroadcastType;
    payload: T
}