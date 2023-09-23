export interface SolanaAccountActivityModel {
    address: string;
    balance_change: bigint | number;
    block_date: Date;
    block_hash: string;
    block_time: Date;
    post_balance: bigint | number;
    pre_balance: bigint | number;
    signed: boolean;
    tx_id: string;
    tx_index: number;
    tx_success: boolean;
    writable: boolean;
}
