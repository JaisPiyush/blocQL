import { ProvidersOptions, Scanner } from 'scanner';
import { SolanaServiceProvider } from './providers/solana_service_provider';
import { SolanaBlockchainScanner } from './solana_blockchain_scanner';
import { SolanaFetchedDataProcessor } from './solana_fetched_data_processor';
import { SolanaConfig } from './providers';

export * from './solana_blockchain_scanner';
export * from './providers';

type SolanaScannerArgs = {
    blockChainScanner: SolanaBlockchainScanner;
    fetchedDataProcessor?: SolanaFetchedDataProcessor;
    providers: ProvidersOptions<SolanaServiceProvider, SolanaConfig>;
};

export const solanaScanner = ({
    blockChainScanner,
    fetchedDataProcessor,
    providers,
}: SolanaScannerArgs) => {
    return new Scanner<
        SolanaServiceProvider,
        SolanaBlockchainScanner,
        SolanaConfig
    >(
        blockChainScanner,
        fetchedDataProcessor || new SolanaFetchedDataProcessor(),
        providers
    );
};
