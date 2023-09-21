export interface DatastoreInterface {
    insert<T>(data: T): Promise<void>;
    get<T, R>(args: T): Promise<R>;
    update<T>(data: T): Promise<void>;
    find<T, R>(args: T): Promise<R[]>;
    batchInsert<T>(data: T[]): Promise<void>;
}

export type DatastoreProvider = (storeName: string) => Promise<DatastoreInterface>;