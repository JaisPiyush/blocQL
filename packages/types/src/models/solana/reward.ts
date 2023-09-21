export interface SolanaRewardModel {
    recipient: string;
    lamports: number | string | bigint;
    commission?: number | string | bigint | null;
    reward_type: string | null;
    post_balance: number | string | bigint;
    pre_balance: number | string | bigint;
    block_hash: string;
    slot: number | string | bigint;
    block_time: number;
}