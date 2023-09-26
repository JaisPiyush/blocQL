export interface SolanaInstructionCallModel {
    id: string;
    tx_id: string;
    block_hash: string;
    block_slot: number | bigint;
    block_time: Date;
    tx_signer: string;
    tx_success: boolean;
    inner_instruction_index: number | null;
    instruction_index: number;
    is_inner: boolean;
    program_id: string;
    main_program_id: string;
    program: string | null;
    instruction_name: string;
    data: any | null;
    raw_data?: string | null;
    accounts: string[] | null;
    inner_instructions: string[] | null;
}
