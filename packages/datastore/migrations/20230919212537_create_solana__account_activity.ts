import { Knex } from 'knex';
import { TableNames } from '../src/constants';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TableNames.SolanaAccountActivity, (table) => {
        table.string('address').notNullable();
        table.bigint('balance_change').notNullable().defaultTo(0);
        table.date('block_date').notNullable();
        table.string('block_hash').notNullable();
        table.bigint('slot').notNullable();
        table.timestamp('block_time').notNullable();
        table.bigint('post_balance').notNullable();
        table.bigint('pre_balance').notNullable();
        table.boolean('signed').notNullable().defaultTo(false);
        table.string('tx_id').notNullable();
        table.integer('tx_index').notNullable();
        table.boolean('tx_success').defaultTo(true);
        table.boolean('writable').defaultTo(false);

        table.primary(['address', 'tx_id']);

        table.index('address', 'idx_solana_account_activity_address', {
            storageEngineIndexType: 'hash',
        });

        table.index('block_hash', 'idx_solana_account_activity_block_hash', {
            storageEngineIndexType: 'hash',
        });

        table.index('tx_id', 'idx_solana_account_activity_tx_id', {
            storageEngineIndexType: 'hash',
        });

        table.index('block_date', 'idx_solana_account_activity_block_date', {
            storageEngineIndexType: 'btree',
        });

        table.index('slot', 'idx_solana_account_activity_slot', {
            storageEngineIndexType: 'btree',
        });

        table.index('block_time', 'idx_solana_account_activity_block_time', {
            storageEngineIndexType: 'btree',
        });
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TableNames.SolanaAccountActivity);
}
