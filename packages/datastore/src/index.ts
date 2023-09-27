import knex, {Knex} from 'knex';

export * from './solana';
export * from './constants'
export type {Knex};
export {knex};

let _knex: Knex | undefined;
export const getSolanaKnex = (connection: Pick<Knex.Config, 'connection'>): Knex => {
    if (_knex) {
        return _knex;
    }
    _knex =  knex({
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
    });
    return _knex;
}
