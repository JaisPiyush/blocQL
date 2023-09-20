import { Knex } from "knex";
import { TableNames } from "../src/constants";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TableNames.SolanaTransactions, (table) => {
        table.string('signature').primary();
        table.bigint('slot').notNullable();
        table.integer('tx_index').notNullable();
        table.string('signer').notNullable();
        table.boolean('success').notNullable();
        table.timestamp('block_time').notNullable();
        table.date('block_date').notNullable();
        table.bigint('fee').defaultTo(0);
        table.bigint('compute_unit_consumed').defaultTo(0);
        table.specificType('post_balances', 'bigint[]').defaultTo([]);
        table.specificType('pre_balances', 'bigint[]').defaultTo([]);
        table.specificType('post_token_balances', 'text[]').defaultTo([]);
        table.specificType('pre_token_balances', 'text[]').defaultTo([]);
        table.specificType('account_keys', 'text[]')
            .defaultTo([])
        table.specificType('instructions', 'text[]').defaultTo([]);
        table.specificType('signatures', 'text[]').defaultTo([]);
        table.string('error_program_id').defaultTo(null);
        table.integer('instruction_index').defaultTo(null);
        table.integer('error_code').defaultTo(null);
        table.string('error').defaultTo(null);
        table.string('block_hash').notNullable();
        table.integer('required_signatures').defaultTo(0);
        table.string('recent_block_hash').notNullable();

        table.index('slot', 'idx_solana_txn_slot', {
            storageEngineIndexType: 'btree'
        });

        table.index('signer', 'idx_solana_txn_signer', {
            storageEngineIndexType: 'hash'
        });

        table.index('block_time', 'idx_solana_txn_block_time', {
            storageEngineIndexType: 'btree'
        });

        table.index('success', 'idx_solana_txn_success', {
            storageEngineIndexType: 'btree'
        });

        

    });
    // Create GIN Indexes
    await knex.raw(`CREATE INDEX idx_solana_txn_account_keys ON ${TableNames.SolanaTransactions} USING GIN (account_keys)`);

}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TableNames.SolanaTransactions);
}

