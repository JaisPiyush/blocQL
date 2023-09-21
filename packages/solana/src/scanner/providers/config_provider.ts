import { Commitment, ConnectionConfig } from '@solana/web3.js';
import { ConfigProvider } from 'types/src/providers/config_provider';

export interface SolanaConfig {
    endpoint: string;
    commitmentOrConfig?: ConnectionConfig | Commitment;
}

export type SolanaConfigProvider = ConfigProvider<SolanaConfig>;
