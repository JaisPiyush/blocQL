import { ProvidersOptions, Scanner } from "scanner";
import {SolanaBlockchainScanner, SolanaConfig, SolanaServiceProvider, solanaScanner, solanaServiceProvider, web3} from 'solana';
import {MemorySettingsService} from 'scanner/src/settings/memory_settings_service'
import { logger } from "../logger";
import {ConsoleDataBroadcaster} from 'scanner/src/broadcaster/console_data_broadcaster';


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

const _runSolanaScanner = async (scanner: Scanner) => {
    await scanner.start();

    const _logger = logger()

    await new Promise<void>((resolve) => {
        process.on('SIGTERM', () => {
            _logger.info('Received SIGTERM');
            resolve();
        });

        process.on('SIGINT', () => {
            _logger.info('Received SIGINT');
            resolve();
        });

        process.on('uncaughtException', (e) => {
            _logger.error(e);
            resolve();
        });

        process.on('unhandledRejection', (e) => {
            _logger.error(e);
            resolve();
        });
    });
    _logger.info('Stopping scanner')
    await scanner.stop();
    process.exit(0);
}

export const runSolanaTestScanner = async () => {
    await _runSolanaScanner(solanaTestScanner);
}


