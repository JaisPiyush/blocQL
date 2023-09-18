export type ConfigProvider<T> = () => T & {
    maxRequestPerSecond: number;
    defaultStartBlockHeight?: number
};