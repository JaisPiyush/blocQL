import { Knex } from "knex";
import { BaseDatastore } from "../base";
import {SolanaTokenMetadataModel} from 'types/src/models/solana/token_metadata';
import { TableNames } from "../constants";

export class SolanaTokenMetadatasDatastore 
    extends BaseDatastore {
        private readonly TokenMetadatas: Knex.QueryBuilder;

        constructor(knex: Knex) {
            super(knex);
            this.TokenMetadatas = knex(TableNames.SolanaTokensMetadata);
        }

        async insert<T = SolanaTokenMetadataModel>(data: T): Promise<void> {
            await this.TokenMetadatas.insert(data);
        }

        async get<R = SolanaTokenMetadataModel, T = Partial<SolanaTokenMetadataModel>>(query: T): Promise<R | null> {
            return await this.TokenMetadatas.where(query as Partial<SolanaTokenMetadataModel>).first();
        }

        async update<Q = Partial<SolanaTokenMetadataModel>, T = Partial<SolanaTokenMetadataModel>>(query: Q, data: T): Promise<void> {
            await this.TokenMetadatas.where(query as Partial<SolanaTokenMetadataModel>).update(data);
        }

        async find<T = SolanaTokenMetadataModel, R = Partial<SolanaTokenMetadataModel>>(query: R): Promise<T[]> {
            return await this.TokenMetadatas.where(query as Partial<SolanaTokenMetadataModel>);
        }

        async batchInsert<T = SolanaTokenMetadataModel>(data: T[]): Promise<void> {
            return await  this.knex.batchInsert(TableNames.SolanaTokensMetadata, data.map(this.TokenMetadatas.insert), data.length);
        }


    }