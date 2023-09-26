import { Knex } from "knex";
import { TableNames } from "../src/constants";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TableNames.SolanaTokensMetadata, (table) => {
        table.string("address").primary();
        table.string('model');
        table.string('update_authority_address');
        table.jsonb('json').defaultTo(null);
        table.boolean('json_loaded').defaultTo(true);
        // metadata.json.name incase of nft
        table.string('name').notNullable();
        table.string('symbol').notNullable();
        table.string('uri').notNullable();
        table.boolean('is_mutable').defaultTo(false);
        table.boolean('primary_sale_happened').defaultTo(false);
        table.integer('seller_fee_basis_points').defaultTo(0);
        table.integer('edition_nonce');
        table.specificType('creators', 'jsonb[]').defaultTo([]);
        table.integer('token_standard');
        table.jsonb('collection').defaultTo(null);
        table.jsonb('collection_details').defaultTo(null);
        table.jsonb('programmable_config').defaultTo(null);
        table.string('metadata_address').defaultTo(null);
        table.string('mint_address').defaultTo(null);
        table.string('freeze_authority_address').defaultTo(null);
        table.integer('supply').defaultTo(0);
        table.bigint('supply_basis_points').defaultTo(0);
        table.jsonb('supply_currency').defaultTo(null);
        table.boolean('is_wrapped_sol').defaultTo(false);
        table.string('currency_symbol').defaultTo(null);
        table.integer('currency_decimals').defaultTo(0);
        table.string('currency_namespace').defaultTo('spl-token');
        table.jsonb('edition').defaultTo(null);
        table.string('image').defaultTo(null);
        table.string('description').defaultTo(null);
        table.string('uri');
        table.specificType('attributes', 'json[]').defaultTo(null);
        


    });
}


export async function down(knex: Knex): Promise<void> {
}

