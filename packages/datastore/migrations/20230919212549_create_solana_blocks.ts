import { Knex } from 'knex';
import { TableNames } from '../src/constants';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TableNames.SolanaBlocks, (table) => {
        table.bigint('slot').primary();
        table.bigint('block_height');
        table.bigint('parent_slot');
        table.string('block_hash').notNullable();
        table.timestamp('block_time').notNullable();
        table.date('block_date').notNullable();
        table.integer('tx_count').notNullable();
        table.integer('tx_success_count').defaultTo(0);
        table.integer('tx_error_count').defaultTo(0);
        table.integer('successful_vote_txn_count').defaultTo(0);
        table.integer('failed_vote_txn_count').defaultTo(0);
        table.integer('successful_non_vote_txn_count').defaultTo(0);
        table.integer('failed_non_vote_txn_count').defaultTo(0);
        table.integer('total_vote_txn_count').defaultTo(0);
        table.integer('total_non_vote_txn_count').defaultTo(0);

        table.index('block_hash', 'idx_solana_blocks_block_hash', {
            storageEngineIndexType: 'hash',
        });
        table.index('block_date', 'idx_solana_blocks_block_date', {
            storageEngineIndexType: 'btree',
        });
        table.index('block_time', 'idx_solana_blocks_block_time', {
            storageEngineIndexType: 'btree',
        });
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TableNames.SolanaBlocks);
}
