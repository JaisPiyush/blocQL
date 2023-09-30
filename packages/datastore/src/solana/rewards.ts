import { Knex } from 'knex';
import { BaseDatastore } from '../base';
import { SolanaRewardModel } from 'types/src/models/solana/reward';
import { Schemas, TableNames } from '../constants';

export class SolanaRewardsDatastore extends BaseDatastore {
    private readonly Rewards: Knex.QueryBuilder;

    constructor(knex: Knex) {
        super(knex);
        this.Rewards = knex.withSchema(Schemas.Solana).table(TableNames.SolanaRewards);
    }

    async exists(slot: number | bigint, recipient: string) {
        const result = await this.Rewards.where({ slot }).andWhere({
            recipient,
        });
        return result !== null && result !== undefined && result.length > 0;
    }

    async insert<T = SolanaRewardModel>(data: T): Promise<void> {
        if (!(await this.exists((data as any).slot, (data as any).recipient))) {
            await this.Rewards.insert(data);
        }
    }

    async get<R = SolanaRewardModel, T = Partial<SolanaRewardModel>>(
        query: T
    ): Promise<R | null> {
        return await this.Rewards.where(
            query as Partial<SolanaRewardModel>
        ).first();
    }

    async update<
        Q = Partial<SolanaRewardModel>,
        T = Partial<SolanaRewardModel>,
    >(query: Q, data: T): Promise<void> {
        await this.Rewards.where(query as Partial<SolanaRewardModel>).update(
            data
        );
    }

    async find<T = SolanaRewardModel, R = Partial<SolanaRewardModel>>(
        query: R
    ): Promise<T[]> {
        return await this.Rewards.where(query as Partial<SolanaRewardModel>);
    }

    async batchInsert<T = SolanaRewardModel>(data: T[]): Promise<void> {
        await this.Rewards.insert(data);
    }

    async delete<R = { slot: number | bigint }>(query: R): Promise<void> {
        await this.Rewards.where(query as Partial<SolanaRewardModel>).delete();
    }
}
