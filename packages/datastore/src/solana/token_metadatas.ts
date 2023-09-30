import { Knex } from 'knex';
import { BaseDatastore } from '../base';
import { SolanaTokenMetadataModel } from 'types/src/models/solana/token_metadata';
import { Schemas, TableNames } from '../constants';

export class SolanaTokenMetadatasDatastore extends BaseDatastore {
    private readonly TokenMetadatas: Knex.QueryBuilder;

    constructor(knex: Knex) {
        super(knex);
        this.TokenMetadatas = knex.withSchema(Schemas.Solana).table(TableNames.SolanaTokensMetadata);
    }

    async exists(id: string) {
        const result = await this.TokenMetadatas.where({ address: id });
        return result !== null && result !== undefined && result.length > 0;
    }

    async insert<T = SolanaTokenMetadataModel>(data: T): Promise<void> {
        if (!(await this.exists((data as any).address))) {
            await this.TokenMetadatas.insert(data);
        }
    }

    async get<
        R = SolanaTokenMetadataModel,
        T = Partial<SolanaTokenMetadataModel>,
    >(query: T): Promise<R | null> {
        return await this.TokenMetadatas.where(
            query as Partial<SolanaTokenMetadataModel>
        ).first();
    }

    async update<
        Q = Partial<SolanaTokenMetadataModel>,
        T = Partial<SolanaTokenMetadataModel>,
    >(query: Q, data: T): Promise<void> {
        await this.TokenMetadatas.where(
            query as Partial<SolanaTokenMetadataModel>
        ).update(data);
    }

    async find<
        T = SolanaTokenMetadataModel,
        R = Partial<SolanaTokenMetadataModel>,
    >(query: R): Promise<T[]> {
        return await this.TokenMetadatas.where(
            query as Partial<SolanaTokenMetadataModel>
        );
    }

    async batchInsert<T = SolanaTokenMetadataModel>(data: T[]): Promise<void> {
        await this.TokenMetadatas.insert(data);
    }
}
