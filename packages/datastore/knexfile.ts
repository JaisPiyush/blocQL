import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
    production: {
        client: 'pg',
        connection: {
            host: process.env['SOLANA_POSTGRES_HOST'] || 'localhost',
            port: Number(process.env['SOLANA_POSTGRES_PORT']),
            database: process.env['SOLANA_POSTGRES_DATABASE'],
            user: process.env['SOLANA_POSTGRES_WRITE_USER'],
            password: process.env['SOLANA_POSTGRES_WRITE_PASSWORD'],
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
