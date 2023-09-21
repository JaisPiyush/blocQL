import { ParsedAccountsModeBlockResponse } from "@solana/web3.js";

export type SolanaBlock = Omit<ParsedAccountsModeBlockResponse, 'transactions'>;