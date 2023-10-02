export enum TableNames {
    ProcessedBlock = 'processed_block',
    SolanaBlocks = 'solana_blocks',
    SolanaTransactions = 'solana_transactions',
    SolanaVoteTransactions = 'solana_vote_transactions',
    SolanaAccountActivity = 'solana_account_activity',
    SolanaTokensMetadata = 'solana_tokens_metadata',
    SolanaRewards = 'solana_rewards',
    SolanaInstructionCalls = 'solana_instruction_calls',
    FlowBlocks = 'flow_blocks',
    FlowTransactions = 'flow_transactions',
    FlowAccountActivity = 'flow_account_activity',
    FlowEvents = 'flow_events',
}


export enum Schemas {
    Solana = 'solana',
    Flow = 'flow'
}

export const PROCESSED_BLOCK_KEY_NAME = 'processed_block_key';
