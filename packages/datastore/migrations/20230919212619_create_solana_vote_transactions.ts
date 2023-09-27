import { Knex } from 'knex';
import { TableNames } from '../src/constants';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(
        TableNames.SolanaVoteTransactions,
        (table) => {
            table.string('signature').primary();
            table.bigint('slot').notNullable();
            table.integer('tx_index').notNullable();
            table.string('signer').notNullable();
            table.boolean('success').notNullable();
            table.timestamp('block_time').notNullable();
            table.date('block_date').notNullable();
            table.bigint('fee').defaultTo(0);
            table.specificType('post_balances', 'bigint[]').defaultTo(null);
            table.specificType('pre_balances', 'bigint[]').defaultTo(null);
            table.specificType('signatures', 'text[]').defaultTo(null);
            table.string('error').defaultTo(null);
            table.string('block_hash').notNullable();
            table.integer('required_signatures').defaultTo(0);
            table.string('recent_block_hash').notNullable();
            table.string('vote_account').defaultTo(null);
            table.string('vote_authority').defaultTo(null);
            table.bigint('root_slot').defaultTo(null);
            table.timestamp('root_timestamp');

            table.index('slot', 'idx_solana_vote_txn_slot', {
                storageEngineIndexType: 'btree',
            });

            table.index('signer', 'idx_solana_vote_txn_signer', {
                storageEngineIndexType: 'hash',
            });

            table.index('block_time', 'idx_solana_vote_txn_block_time', {
                storageEngineIndexType: 'btree',
            });

            table.index('success', 'idx_solana_vote_txn_success', {
                storageEngineIndexType: 'btree',
            });
        }
    );
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(TableNames.SolanaVoteTransactions);
}
