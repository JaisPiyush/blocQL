import { Knex } from 'knex';

const PG_READ_ONLY_USER = process.env['SOLANA_POSTGRES_READ_USER'];
const PG_READ_ONLY_PASSWORD = process.env['SOLANA_POSTGRES_READ_PASSWORD'];
const POSTGRES_DB = process.env['SOLANA_POSTGRES_DATABASE'];

//TODO: Add schema and change user to schema only

export async function up(knex: Knex): Promise<void> {
    if (!PG_READ_ONLY_USER && !PG_READ_ONLY_PASSWORD && !POSTGRES_DB) {
        throw new Error(
            `Username: ${PG_READ_ONLY_USER} and password: ${PG_READ_ONLY_PASSWORD} not correctly defined.`
        );
    }

    // Create ROLE
    await knex.raw(`create role read_access`);
    // Grant connect to ROLE
    await knex.raw(`grant connect on database ${POSTGRES_DB} to read_access`);
    // Grant usage on schema to ROLE
    await knex.raw(`grant usage on schema public to read_access`);
    // Grant select on all tables to ROLE
    await knex.raw(
        `grant select on all tables in schema public to read_access`
    );
    // Create user
    await knex.raw(
        `create user ${PG_READ_ONLY_USER} with encrypted password '${PG_READ_ONLY_PASSWORD}'`
    );
    // Grant ROLE to user
    await knex.raw(`grant read_access to ${PG_READ_ONLY_USER}`);
}

export async function down(knex: Knex): Promise<void> {
    if (!PG_READ_ONLY_USER && !PG_READ_ONLY_PASSWORD && !POSTGRES_DB) {
        throw new Error(
            `Username: ${PG_READ_ONLY_USER} and password: ${PG_READ_ONLY_PASSWORD} not correctly defined.`
        );
    }

    // REVOKE role
    await knex.raw(`revoke read_access from ${PG_READ_ONLY_USER}`);
    // drop user
    await knex.raw(`drop user ${PG_READ_ONLY_USER}`);
    // revoke usage on schema to role
    await knex.raw(`revoke usage on schema public from read_access`);
    // revoke connect on database to role
    await knex.raw(
        `revoke connect on database ${POSTGRES_DB} from read_access`
    );
    // drop role
    await knex.raw(`drop role read_access`);
}
