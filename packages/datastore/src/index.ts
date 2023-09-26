import knex, {Knex} from 'knex';

export * from './solana';
export * from './constants'
export type {Knex};
export {knex};


export const getSolanaKnex = (connection: Pick<Knex.Config, 'connection'>): Knex => {
    return knex({
        client: 'pg',
        connection: {
            host: process.env.SOLANA_POSTGRES_HOST,
            port: Number(process.env.SOLANA_POSTGRES_PORT),
            database: process.env.SOLANA_POSTGRES_DATABASE,
            user: process.env.SOLANA_POSTGRES_WRITE_USER,
            password: process.env.SOLANA_POSTGRES_WRITE_PASSWORD,
            ...connection,
        },
        pool: {
            min: 2,
            max: 10
        }
    })
}
