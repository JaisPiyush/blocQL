import { Knex } from "knex";
import { BaseDatastore } from "../base";
import {SolanaRewardModel} from 'types/src/models/solana/reward'
import { TableNames } from "../constants";

export class SolanaRewardsDatastore
    extends BaseDatastore {
        private readonly Rewards: Knex.QueryBuilder;

        constructor(knex: Knex) {
            super(knex);
            this.Rewards = knex(TableNames.SolanaRewards);
        }

        async insert<T = SolanaRewardModel>(data: T): Promise<void> {
            await this.Rewards.insert(data);
        }

        async get<R = SolanaRewardModel, T = Partial<SolanaRewardModel>>(query: T): Promise<R | null> {
            return await this.Rewards.where(query as Partial<SolanaRewardModel>).first();
        }

        async update<Q = Partial<SolanaRewardModel>, T = Partial<SolanaRewardModel>>(query: Q, data: T): Promise<void> {
            await this.Rewards.where(query as Partial<SolanaRewardModel>).update(data);
        }

        async find<T = SolanaRewardModel, R = Partial<SolanaRewardModel>>(query: R): Promise<T[]> {
            return await this.Rewards.where(query as Partial<SolanaRewardModel>);
        }

        async batchInsert<T = SolanaRewardModel>(data: T[]): Promise<void> {
            await this.Rewards.insert(data);
        }

        async delete<R = { slot: number | bigint }>(query: R): Promise<void> {
            await this.Rewards.where(query as Partial<SolanaRewardModel>).delete();
        }


    }