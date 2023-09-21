export interface SolanaBlockModel {
    slot: number | string | bigint;
    parent_slot: number | string | bigint | null;
    block_hash: string;
    block_time: number;
    block_height: number | null;
    block_date: Date;
    tx_count: number;
    tx_success_count: number;
    tx_error_count: number;
    successful_vote_txn_count: number;
    failed_vote_txn_count: number;
    successful_non_vote_txn_count: number;
    failed_non_vote_txn_count: number;
    total_vote_txn_count: number;
    total_non_vote_txn_count: number;
}
