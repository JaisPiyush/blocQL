import { Knex } from "knex";
import { BaseDatastore } from "../base";
import {SolanaInstructionCallModel} from 'types/src/models/solana/instruction_call'
import { TableNames } from "../constants";

export class SolanaInstructionCallsDatastore
    extends BaseDatastore {
        private readonly InstructionCalls: Knex.QueryBuilder;

        constructor(knex: Knex) {
            super(knex);
            this.InstructionCalls = knex(TableNames.SolanaInstructionCalls);
        }

        async insert<T = SolanaInstructionCallModel>(data: T): Promise<void> {
            await this.InstructionCalls.insert(data);
        }

        async get<R = SolanaInstructionCallModel, T = Partial<SolanaInstructionCallModel>>(query: T): Promise<R | null> {
            return await this.InstructionCalls.where(query as Partial<SolanaInstructionCallModel>).first();
        }

        async update<Q = Partial<SolanaInstructionCallModel>, T = Partial<SolanaInstructionCallModel>>(query: Q, data: T): Promise<void> {
            await this.InstructionCalls.where(query as Partial<SolanaInstructionCallModel>).update(data);
        }

        async find<T = SolanaInstructionCallModel, R = Partial<SolanaInstructionCallModel>>(query: R): Promise<T[]> {
            return await this.InstructionCalls.where(query as Partial<SolanaInstructionCallModel>);
        }

        async batchInsert<T = SolanaInstructionCallModel>(data: T[]): Promise<void> {
            return await  this.knex.batchInsert(TableNames.SolanaInstructionCalls, data.map(this.InstructionCalls.insert), data.length);
        }



    }