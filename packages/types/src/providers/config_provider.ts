export type ConfigProvider<T> = () => Promise<T & {
    maxRequestPerSecond: number;
}>;