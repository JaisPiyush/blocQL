import { Knex } from "knex";
import { Schemas, TableNames } from "../src";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.withSchema(Schemas.Flow).createTable(TableNames.FlowAccountActivity, (table) => {
        table.string('id').primary().notNullable();
        table.string('address').notNullable();
        table.string('transaction_id').notNullable();
        table.integer('block_height').notNullable();
        table.string('block_id').notNullable();
        table.timestamp('block_time');
        table.date('block_date');
        table.bigint('balance');

        table.index('address', 'idx_flow_account_activity_address', {
            storageEngineIndexType: 'hash'
        });

        table.index('transaction_id', 'idx_flow_account_activity_transaction_id', {
            storageEngineIndexType: 'hash'
        });

        table.index('block_height', 'idx_flow_account_activity_block_height', {
            storageEngineIndexType: 'btree'
        });

        table.index('block_time', 'idx_flow_account_activity_block_time', {
            storageEngineIndexType: 'btree'
        });

        table.index('block_date', 'idx_flow_account_activity_block_date', {
            storageEngineIndexType: 'btree'
        });

        table.index('balance', 'idx_flow_account_activity_balance', {
            storageEngineIndexType: 'btree'
        });
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.withSchema(Schemas.Flow).dropTableIfExists(TableNames.FlowAccountActivity);
}

