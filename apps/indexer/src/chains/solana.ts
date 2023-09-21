import { ProvidersOptions, Scanner } from "scanner";
import {SolanaBlockchainScanner, SolanaConfig, SolanaServiceProvider, solanaScanner, solanaServiceProvider, web3} from 'solana';
import {MemorySettingsService} from 'scanner/src/settings/memory_settings_service'
import { logger } from "../logger";
import {ConsoleDataBroadcaster} from 'scanner/src/broadcaster/console_data_broadcaster';
import { runScanner } from "../runners";


const solanaTestConfigProvider = () => ({
    endpoint: web3.clusterApiUrl('mainnet-beta'),
    maxRequestPerSecond: 10,
    defaultStartBlockHeight: 218827117
})

const solanaTestScannerProviders: ProvidersOptions<SolanaServiceProvider, SolanaConfig> = {
    settingsServiceProvider: async () => new MemorySettingsService(),
    logProvider: logger,
    configProvider: solanaTestConfigProvider,
    dataBroadcasterProvider:  async() => new ConsoleDataBroadcaster(),
    serviceProvider: solanaServiceProvider(solanaTestConfigProvider)
}

const solanaBlockchainScanner = new SolanaBlockchainScanner({}, 
        solanaTestScannerProviders
);

const solanaTestScanner = solanaScanner({
    blockChainScanner: solanaBlockchainScanner,
    providers: solanaTestScannerProviders
});


export const runSolanaTestScanner = async () => {
    await runScanner(async () => {
        await solanaTestScanner.start();
    }, async () => {
        await solanaTestScanner.stop();
    });
}


