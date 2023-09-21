import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
    production: {
        client: 'pg',
        connection: {
            host: process.env['PG_HOST'] || 'localhost',
            port: Number(process.env['PG_PORT']),
            database: process.env['POSTGRES_DB'],
            user: process.env['POSTGRES_USER'],
            password: process.env['POSTGRES_PASSWORD'],
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
};

module.exports = config;
