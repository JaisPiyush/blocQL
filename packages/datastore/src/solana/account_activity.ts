import { Knex } from "knex";
import { BaseDatastore } from "../base";
import { TableNames } from "../constants";
import {SolanaAccountActivityModel} from 'types/src/models/solana/account_activity'

export class SolanaAccountActivityDatastore 
    extends BaseDatastore {

        private readonly AccountActivity: Knex.QueryBuilder;

        constructor(knex: Knex) {
            super(knex);
            this.AccountActivity = knex(TableNames.SolanaAccountActivity);
        }

        async insert<T = SolanaAccountActivityModel>(data: T): Promise<void> {
            await this.AccountActivity.insert(data);
        }

        async get<R = SolanaAccountActivityModel, T = Partial<SolanaAccountActivityModel>>(query: T): Promise<R | null> {
            return await this.AccountActivity.where(query as Partial<SolanaAccountActivityModel>).first();
        }

        async update<Q = Partial<SolanaAccountActivityModel>, T = Partial<SolanaAccountActivityModel>>(query: Q, data: T): Promise<void> {
            await this.AccountActivity.where('slot', query as number).update(data);
        }

        async find<T = SolanaAccountActivityModel, R = Partial<SolanaAccountActivityModel>>(query: R): Promise<T[]> {
            return await this.AccountActivity.where(query as Partial<SolanaAccountActivityModel>);
        }

        async batchInsert<T = SolanaAccountActivityModel>(data: T[]): Promise<void> {
            return await  this.knex.batchInsert(TableNames.SolanaAccountActivity, data.map(this.AccountActivity.insert), data.length);
        }

        async delete<R = { slot: number | bigint }>(query: R): Promise<void> {
            await this.AccountActivity.where(query as Partial<SolanaAccountActivityModel>).delete();
        }



    }