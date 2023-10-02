import { Knex } from "knex";
import { Schemas } from "../src";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(` 
        CREATE SCHEMA IF NOT EXISTS ${Schemas.Flow};
    `)
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(` 
        DROP SCHEMA IF EXISTS ${Schemas.Flow} CASCADE;
    `)
}

