import { DatastoreInterface } from "types";
import {Knex} from 'knex'

export class BaseDatastore implements DatastoreInterface {

    constructor(public readonly knex: Knex) {}

    insert<T>(data: T): Promise<void> {
        throw new Error("Method not implemented.");
    }
    get<R, T>(query: T): Promise<R | null> {
        throw new Error("Method not implemented.");
    }
    update<Q, T>(query: Q, data: T): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find<T, R>(query: R): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    batchInsert<T>(data: T[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

}