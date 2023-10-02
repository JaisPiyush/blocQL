import { Knex } from "knex";
import { Schemas, TableNames } from "../src";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.withSchema(Schemas.Flow).createTable(TableNames.FlowBlocks, (table) => {
        table.string('id').primary().notNullable();
        table.string('parent_id').notNullable();
        table.bigint('height').notNullable();
        table.timestamp('block_time');
        table.date('block_date');
        table.specificType('collections', 'text[]');

        table.index('height', 'idx_flow_blocks_height', {
            storageEngineIndexType: 'btree'
        });

        table.index('block_time', 'idx_flow_blocks_block_time', {
            storageEngineIndexType: 'btree'
        });

        table.index('block_date', 'idx_flow_blocks_block_date', {
            storageEngineIndexType: 'btree'
        });
    });
}


export async function down(knex: Knex): Promise<void> {

    
}

