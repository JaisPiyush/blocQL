import { Knex } from "knex";
import { Schemas, TableNames } from "../src";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.withSchema(Schemas.Flow).createTable(TableNames.FlowEvents, (table) => {
        table.string('id').primary().notNullable();
        table.string('transaction_id').notNullable();
        table.integer('transaction_index').notNullable();
        table.integer('event_index').notNullable();
        table.bigint('block_height').notNullable();
        table.string('block_id').notNullable();
        table.timestamp('block_time');
        table.date('block_date');
        table.jsonb('payload');

        table.index('transaction_id', 'idx_flow_events_transaction_id', {
            storageEngineIndexType: 'hash'
        });

        table.index('block_height', 'idx_flow_events_block_height', {
            storageEngineIndexType: 'btree'
        });
        
        table.index('block_id', 'idx_flow_events_block_id', {
            storageEngineIndexType: 'hash'
        });

        table.index('block_time', 'idx_flow_events_block_time', {
            storageEngineIndexType: 'btree'
        });

        table.index('block_date', 'idx_flow_events_block_date', {
            storageEngineIndexType: 'btree'
        });

        

    });

    await knex.raw(
        `CREATE INDEX idx_flow_events_payload ON ${Schemas.Flow}.${TableNames.FlowEvents} USING GIN (payload)`
    )
}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.withSchema(Schemas.Flow).dropTableIfExists(TableNames.FlowEvents);
}

