import { Knex } from "knex";
import { Schemas, TableNames } from "../src";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.withSchema(Schemas.Flow).createTable(TableNames.FlowTransactions, (table) => {
        table.string('signature').primary().notNullable();
        table.string('block_id').notNullable();
        table.integer('status');
        table.string('status_string');
        table.integer('status_code');
        table.text('error_message');
        table.string('payer');
        table.string('proposer');
        table.specificType('authorizers', 'text[]');
        table.timestamp('block_time');
        table.date('block_date');
        table.bigint('block_height');

        table.index('block_id', 'idx_flow_transactions_block_id', {
            storageEngineIndexType: 'hash'
        });

        table.index('status', 'idx_flow_transactions_status', {
            storageEngineIndexType: 'btree'
        });

        table.index('block_time', 'idx_flow_transactions_block_time', {
            storageEngineIndexType: 'btree'
        });

        table.index('block_date', 'idx_flow_transactions_block_date', {
            storageEngineIndexType: 'btree'
        });

        table.index('block_height', 'idx_flow_transactions_block_height', {
            storageEngineIndexType: 'btree'
        });

        table.index('payer', 'idx_flow_transactions_payer', {
            storageEngineIndexType: 'hash'
        });

        table.index('proposer', 'idx_flow_transactions_proposer', {
            storageEngineIndexType: 'hash'
        });

    });

    await knex.raw(
        `CREATE INDEX idx_flow_txn_authorizers ON ${Schemas.Flow}.${TableNames.FlowTransactions} USING GIN (authorizers)`
    );
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.withSchema(Schemas.Flow).dropTableIfExists(TableNames.FlowTransactions);
}

