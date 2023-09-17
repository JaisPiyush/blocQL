export type DataBroadcast<T=any> = {
    blockHeight: number,
    data: T
}

export interface DataBroadcasterInterface {
    broadcast: <T=any>(data: DataBroadcast<T>) => Promise<void>;
    destroy?: () => Promise<void>;
}

export type DataBroadcasterProvider = () => Promise<DataBroadcasterInterface>;