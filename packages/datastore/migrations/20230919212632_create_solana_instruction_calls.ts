import { Knex } from "knex";
import { TableNames } from "../src/constants";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TableNames.SolanaInstructionCalls, (table) => {
        table.string('program_id').notNullable();
        table.string('program').notNullable();
        table.string('call_type').notNullable();
        table.jsonb('payload').defaultTo({});
        table.specificType('accounts', 'text[]').defaultTo([]);
    });
}


export async function down(knex: Knex): Promise<void> {
}

