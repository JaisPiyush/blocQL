import { ParsedAccountsModeBlockResponse, ParsedBlockResponse } from "@solana/web3.js";

export enum SolanaEventType {
    SolanaBlockFetched = 'SolanaBlockFetched'
};

export namespace SolanaEventPayload {
    export type SolanaBlockFetched = {
        blockSlot: number;
        data: ParsedAccountsModeBlockResponse;
    }
}