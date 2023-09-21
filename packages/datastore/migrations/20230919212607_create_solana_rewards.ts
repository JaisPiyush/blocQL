import { Knex } from 'knex';
import { TableNames } from '../src/constants';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TableNames.SolanaRewards, (table) => {
        table.bigint('slot').notNullable();
        table.timestamp('block_time').notNullable();
        table.bigint('commission');
        table.bigint('lamports').notNullable();
        table.bigint('post_balance').notNullable();
        table.string('reward_type').notNullable();
        table.bigint('pre_balance').notNullable();
        table.string('recipient').notNullable();
        table.string('block_hash').notNullable();
        table.date('block_date').notNullable();

        table.primary(['slot', 'recipient']);
        table.index('slot', 'idx_solana_rewards_slot', {
            storageEngineIndexType: 'btree',
        });

        table.index('recipient', 'idx_solana_rewards_recipient', {
            storageEngineIndexType: 'hash',
        });
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TableNames.SolanaRewards);
}
