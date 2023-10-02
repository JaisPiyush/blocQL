import { Knex } from 'knex';
import { Schemas, TableNames } from '../src/constants';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.withSchema(Schemas.Solana).createTable(TableNames.SolanaTokensMetadata, (table) => {
        table.string('address').primary();
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
        table.specificType('creators', 'jsonb[]').defaultTo(null);
        table.integer('token_standard');
        table.jsonb('collection').defaultTo(null);
        table.jsonb('collection_details').defaultTo(null);
        table.jsonb('programmable_config').defaultTo(null);
        table.string('metadata_address').defaultTo(null);
        table.string('freeze_authority_address').defaultTo(null);
        table.jsonb('supply').defaultTo(0);
        table.boolean('is_wrapped_sol').defaultTo(false);
        table.jsonb('currency').defaultTo(null);
        table.integer('decimals').defaultTo(0);
        table.jsonb('edition').defaultTo(null);
        table.string('image').defaultTo(null);
        table.string('description').defaultTo(null);
        table.specificType('attributes', 'jsonb[]').defaultTo(null);

        table.index('model', 'idx_solana_tokens_metadata_model', {
            storageEngineIndexType: 'hash',
        });

        table.index('is_mutable', 'idx_solana_tokens_metadata_is_mutable', {
            storageEngineIndexType: 'btree',
        });

        table.index('json_loaded', 'idx_solana_tokens_metadata_json_loaded', {
            storageEngineIndexType: 'btree',
        });
    });

    // Create GIN Indexes
    await knex.raw(
        `CREATE INDEX idx_solana_tokens_creators ON ${Schemas.Solana}.${TableNames.SolanaTokensMetadata} USING GIN (creators)`
    );
    await knex.raw(
        `CREATE INDEX idx_solana_tokens_attributes ON ${Schemas.Solana}.${TableNames.SolanaTokensMetadata} USING GIN (attributes)`
    );
    await knex.raw(
        `CREATE INDEX idx_solana_tokens_json ON ${Schemas.Solana}.${TableNames.SolanaTokensMetadata} USING GIN (json)`
    );
    await knex.raw(
        `CREATE INDEX idx_solana_tokens_edition ON ${Schemas.Solana}.${TableNames.SolanaTokensMetadata} USING GIN (edition)`
    );
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.withSchema(Schemas.Solana).dropTable(TableNames.SolanaTokensMetadata);
}
