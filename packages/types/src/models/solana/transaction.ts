export interface SolanaTransactionModel {
    signature: string;
    slot: bigint | number;
    tx_index: number;
    signer: string;
    success: boolean;
    block_time: Date;
    block_date: Date;
    fee: bigint | number;
    compute_unit_consumed?: bigint | number;
    post_balances: (bigint | number)[];
    pre_balances: (bigint | number)[];
    account_keys: string[];
    instructions: string[];
    signatures: string[];
    error_program_id?: string | null;
    error_instruction_index?: number | null;
    error_code?: number | null;
    error?: string | null;
    block_hash: string;
    required_signatures: number;
    recent_block_hash: string;
}

export interface SolanaVoteTransactionModel {
    signature: string;
    slot: bigint | number;
    tx_index: number;
    signer: string;
    success: boolean;
    block_time: Date;
    block_date: Date;
    fee: bigint | number;
    post_balances: (bigint | number)[];
    pre_balances: (bigint | number)[];
    signatures?: string[] | null,
    error?: string | null;
    block_hash: string;
    required_signatures: number;
    recent_block_hash: string;
    vote_account?: string;
    vote_authority?: string;
    root_slot?: bigint | number;
    root_timestamp?: Date | null;
}
