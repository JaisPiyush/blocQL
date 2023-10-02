import { Knex } from 'knex';
import { Schemas, TableNames } from '../src/constants';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.withSchema(Schemas.Solana).createTable(
        TableNames.SolanaInstructionCalls,
        (table) => {
            table.string('id').primary();
            table.string('tx_id').notNullable();
            table.string('block_hash').notNullable();
            table.bigint('block_slot').notNullable();
            table.timestamp('block_time').notNullable();
            table.string('tx_signer').notNullable();
            table.boolean('tx_success').defaultTo(true);
            table.integer('inner_instruction_index').defaultTo(null);
            table.integer('instruction_index').notNullable();
            table.boolean('is_inner').defaultTo(false);
            table.string('program_id').notNullable();
            table.string('program').defaultTo(null);
            // The program id of outer instruction in-case of inner instruction
            // otherwise same as program_id
            table.string('main_program_id').notNullable();
            table.string('instruction_name').notNullable();
            table.jsonb('data').defaultTo(null);
            table.text('raw_data').defaultTo(null);
            table.specificType('accounts', 'text[]').defaultTo(null);
            table.specificType('inner_instructions', 'text[]').defaultTo(null);

            table.index('tx_id', 'idx_solana_instruction_call_tx_id', {
                storageEngineIndexType: 'hash',
            });

            table.index('tx_signer', 'idx_solana_instruction_call_tx_signer', {
                storageEngineIndexType: 'hash',
            });

            table.index('block_slot', 'idx_solana_instruction_call_slot', {
                storageEngineIndexType: 'btree',
            });

            table.index(
                'block_time',
                'idx_solana_instruction_call_block_time',
                {
                    storageEngineIndexType: 'btree',
                }
            );

            table.index(
                'program_id',
                'idx_solana_instruction_call_program_id',
                {
                    storageEngineIndexType: 'hash',
                }
            );

            table.index(
                'instruction_name',
                'idx_solana_instruction_call_program_name',
                {
                    storageEngineIndexType: 'hash',
                }
            );
        }
    );

    // Create GIN Indexes
    await knex.raw(
        `CREATE INDEX idx_solana_instruction_call_data ON ${Schemas.Solana}.${TableNames.SolanaInstructionCalls} USING GIN (data)`
    );
    await knex.raw(
        `CREATE INDEX idx_solana_instruction_call_accounts ON ${Schemas.Solana}.${TableNames.SolanaInstructionCalls} USING GIN (accounts)`
    );
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.withSchema(Schemas.Solana).dropTable(TableNames.SolanaInstructionCalls);
}
