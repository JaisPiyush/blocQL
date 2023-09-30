import { Knex } from 'knex';
import { BaseDatastore } from '../base';
import { SolanaBlockModel } from 'types/src/models/solana/block';
import { Schemas, TableNames } from '../constants';

export class SolanaBlockDatastore extends BaseDatastore {
    private readonly Block: Knex.QueryBuilder;

    constructor(knex: Knex) {
        super(knex);
        this.Block = knex.withSchema(Schemas.Solana).table(TableNames.SolanaBlocks);
    }

    async exists(id: number | bigint) {
        const result = await this.Block.where({ slot: id });
        return result !== null && result !== undefined && result.length > 0;
    }

    async insert<T = SolanaBlockModel>(data: T): Promise<void> {
        if (!(await this.exists((data as any).slot))) {
            await this.Block.insert(data);
        }
    }

    async get<R = SolanaBlockModel, T = number | bigint>(
        query: T
    ): Promise<R | null> {
        return await this.Block.where('slot', query as any).first();
    }

    async update<Q = number | bigint, T = Partial<SolanaBlockModel>>(
        query: Q,
        data: T
    ): Promise<void> {
        await this.Block.where('slot', query as any).update(data);
    }

    async find<T = SolanaBlockModel, R = { slot: number | bigint }>(
        query: R
    ): Promise<T[]> {
        return await this.Block.where('slot', (query as any).slot as number);
    }

    async batchInsert<T = SolanaBlockModel>(data: T[]): Promise<void> {
        await this.Block.insert(data);
    }

    async delete<R = { slot: number | bigint }>(query: R): Promise<void> {
        await this.Block.where('slot', (query as any).slot as number).delete();
    }
}
