import { ConfigProvider } from './config_provider';

export type ClientProvider<T> = () => Promise<T>;
