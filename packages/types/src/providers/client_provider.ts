import { ConfigProvider } from "./config_provider";

export type ClientProvider<T, C> = (configProvider: ConfigProvider<C>) => Promise<T>;
