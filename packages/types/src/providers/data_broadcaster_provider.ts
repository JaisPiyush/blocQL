export type DataBroadcast<T = any> = {
    id: string;
    data: T;
};

export interface DataBroadcasterInterface {
    broadcast: <T = any>(data: DataBroadcast<T>) => Promise<void>;
    destroy?: () => Promise<void>;
}

export type DataBroadcasterProvider = (t?: string) => Promise<DataBroadcasterInterface>;
