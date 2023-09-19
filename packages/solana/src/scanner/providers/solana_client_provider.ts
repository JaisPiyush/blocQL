import { ClientProvider } from "types/src/providers/client_provider";
import { SolanaClient } from "../../client/solana_client";
import { SolanaConfig } from "./config_provider";
import { ConfigProvider } from "types/src/providers/config_provider";

import {Connection} from '@solana/web3.js'

export type SolanaClientProvider = ClientProvider<SolanaClient>;

let _solanaClient: SolanaClient | undefined = undefined;

export const solanaClientProvider = (configProvider: ConfigProvider<SolanaConfig>) => async () =>{
        if (!_solanaClient) {
            _solanaClient = new SolanaClient(
                new Connection(configProvider().endpoint, configProvider().commitmentOrConfig)
            )
        }

        return _solanaClient;
}