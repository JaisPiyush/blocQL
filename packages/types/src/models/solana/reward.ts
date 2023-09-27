export interface SolanaRewardModel {
    recipient: string;
    lamports: number | bigint;
    commission?: number | bigint | null;
    reward_type: string | null;
    post_balance: number | bigint;
    pre_balance: number | bigint;
    block_hash: string;
    slot: number | bigint;
    block_time: Date;
    block_date: Date;
}
