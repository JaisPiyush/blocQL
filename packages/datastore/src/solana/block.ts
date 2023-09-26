import { Knex } from "knex";
import { BaseDatastore } from "../base";
import { SolanaBlockModel } from 'types/src/models/solana/block'
import { TableNames } from "../constants";

export class SolanaBlockDatastore
 extends BaseDatastore {
    private readonly Block: Knex.QueryBuilder;

    constructor(knex: Knex) {
        super(knex);
        this.Block = knex(TableNames.SolanaBlocks);
    }

    async insert<T = SolanaBlockModel>(data: T): Promise<void> {
        await this.Block.insert(data);
    }

    async get<R = SolanaBlockModel, T = number | bigint>(query: T): Promise<R | null> {
        return await this.Block.where('slot', query as number).first();
    }

    async update<Q = number | bigint, T = Partial<SolanaBlockModel>>(query: Q, data: T): Promise<void> {
        await this.Block.where('slot', query as number).update(data);
    }

    async find<T = SolanaBlockModel, R = { slot: number | bigint }>(query: R): Promise<T[]> {
        return await this.Block.where('slot', (query as { slot: number | bigint }).slot as number);
    }

    async batchInsert<T = SolanaBlockModel>(data: T[]): Promise<void> {
        return await  this.knex.batchInsert(TableNames.SolanaBlocks, data.map(this.Block.insert), data.length);
    }

    async delete<R = { slot: number | bigint }>(query: R): Promise<void> {
        await this.Block.where('slot', (query as { slot: number | bigint }).slot as number).delete();
    }



 }