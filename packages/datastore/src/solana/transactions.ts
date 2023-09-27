import { Knex } from 'knex';
import { BaseDatastore } from '../base';
import { TableNames } from '../constants';
import {
    SolanaTransactionModel,
    SolanaVoteTransactionModel,
} from 'types/src/models/solana/transaction';

export class SolanaTransactionsDatastore extends BaseDatastore {
    private readonly Transactions: Knex.QueryBuilder;

    constructor(knex: Knex) {
        super(knex);
        this.Transactions = knex(TableNames.SolanaTransactions);
    }

    async exists(id: string) {
        const result = await this.Transactions.where({ signature: id });
        return result !== null && result !== undefined && result.length > 0;
    }

    async insert<T = SolanaTransactionModel>(data: T): Promise<void> {
        if (!(await this.exists((data as any).signature))) {
            await this.Transactions.insert(data);
        }
    }

    async get<R = SolanaTransactionModel, T = Partial<SolanaTransactionModel>>(
        query: T
    ): Promise<R | null> {
        return await this.Transactions.where(
            query as Partial<SolanaTransactionModel>
        ).first();
    }

    async update<
        Q = Partial<SolanaTransactionModel>,
        T = Partial<SolanaTransactionModel>,
    >(query: Q, data: T): Promise<void> {
        await this.Transactions.where(
            query as Partial<SolanaTransactionModel>
        ).update(data);
    }

    async find<T = SolanaTransactionModel, R = Partial<SolanaTransactionModel>>(
        query: R
    ): Promise<T[]> {
        return await this.Transactions.where(
            query as Partial<SolanaTransactionModel>
        );
    }

    async batchInsert<T = SolanaTransactionModel>(data: T[]): Promise<void> {
        await this.Transactions.insert(data);
    }
}

export class SolanaVoteTransactionsDatastore extends BaseDatastore {
    private readonly VoteTransactions: Knex.QueryBuilder;

    constructor(knex: Knex) {
        super(knex);
        this.VoteTransactions = knex(TableNames.SolanaVoteTransactions);
    }

    async exists(id: string) {
        const result = await this.VoteTransactions.where({
            signature: id,
        }).first();
        return !!result;
    }

    async insert<T = SolanaVoteTransactionModel>(data: T): Promise<void> {
        if (!(await this.exists((data as any).signature))) {
            await this.VoteTransactions.insert(data);
        }
    }

    async get<
        R = SolanaVoteTransactionModel,
        T = Partial<SolanaVoteTransactionModel>,
    >(query: T): Promise<R | null> {
        return await this.VoteTransactions.where(
            query as Partial<SolanaVoteTransactionModel>
        ).first();
    }

    async update<
        Q = Partial<SolanaVoteTransactionModel>,
        T = Partial<SolanaVoteTransactionModel>,
    >(query: Q, data: T): Promise<void> {
        await this.VoteTransactions.where(
            query as Partial<SolanaVoteTransactionModel>
        ).update(data);
    }

    async find<
        T = SolanaVoteTransactionModel,
        R = Partial<SolanaVoteTransactionModel>,
    >(query: R): Promise<T[]> {
        return await this.VoteTransactions.where(
            query as Partial<SolanaVoteTransactionModel>
        );
    }

    async batchInsert<T = SolanaTransactionModel>(data: T[]): Promise<void> {
        await this.VoteTransactions.insert(data);
    }
}
