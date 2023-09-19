import { ProvidersOptions, Scanner } from 'scanner';
import { SolanaServiceProvider } from './providers/solana_service_provider';
import { SolanaBlockchainScanner } from './solana_blockchain_scanner';
import { SolanaFetchedDataProcessor } from './solana_fetched_data_processor';

export * from './solana_blockchain_scanner';

type SolanaScannerArgs = {
    blockChainScanner: SolanaBlockchainScanner;
    fetchedDataProcessor?: SolanaFetchedDataProcessor;
    providers: ProvidersOptions<SolanaServiceProvider>
}

export const solanaScanner = ({ blockChainScanner, fetchedDataProcessor, providers }: SolanaScannerArgs) => {
    return new Scanner<SolanaServiceProvider, SolanaBlockchainScanner>(
            blockChainScanner, 
            fetchedDataProcessor || new SolanaFetchedDataProcessor(), 
            providers
        );
}