export interface DatastoreInterface {
    insert<T>(data: T): Promise<void>;
    get<R, T>(query: T): Promise<R | null>;
    update<Q, T>(query: Q, data: T): Promise<void>;
    find<T, R>(query: R): Promise<T[]>;
    batchInsert<T>(data: T[]): Promise<void>;
}

export type DatastoreProvider = (
    storeName: string
) => Promise<DatastoreInterface>;


export async function nullDataStoreProvider(storeName: string): Promise<DatastoreInterface> {
    return {
        insert: async (data: any) => {},
        get: async (data: any) => null,
        update: async () => {},
        find: async () => [],
        batchInsert: async () => {},
    }
}
