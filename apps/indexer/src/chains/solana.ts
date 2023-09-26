import { ProvidersOptions, SQSDataBroadcaster, Scanner } from 'scanner';
import {
    SolanaBlockchainScanner,
    SolanaConfig,
    SolanaServiceProvider,
    blockSQSConsumer,
    solanaScanner,
    solanaServiceProvider,
    web3,
} from 'solana';
import { MemorySettingsService } from 'scanner/src/settings/memory_settings_service';
import { logger } from '../logger';
import { runScanner } from '../runners';
import {SQS} from 'aws-sdk';
import { SolanaDatBroadcastType } from 'solana/src/types';
import { SolanaProcessorProvider } from 'solana/src/processors/processor';

const blockSQSConsumerQueueUrl = process.env.BLOCK_SQS_CONSUMER_QUEUE_URL;
const txnSQSConsumerQueueUrl = process.env.TXN_SQS_CONSUMER_QUEUE_URL;

if (!blockSQSConsumerQueueUrl) throw new Error('BLOCK_SQS_CONSUMER_QUEUE_URL is required');
if (!txnSQSConsumerQueueUrl) throw new Error('TXN_SQS_CONSUMER_QUEUE_URL is required');

const sqs = new SQS({apiVersion: '2012-11-05'})

const solanaTestConfigProvider = () => ({
    endpoint: web3.clusterApiUrl('mainnet-beta'),
    maxRequestPerSecond: 10,
    defaultStartBlockHeight: 219962054,
});

const solanaTestScannerProviders: ProvidersOptions<
    SolanaServiceProvider,
    SolanaConfig
> = {
    settingsServiceProvider: async () => new MemorySettingsService(),
    logProvider: logger,
    configProvider: solanaTestConfigProvider,
    dataBroadcasterProvider: async (t?: string) => {
        if (t === SolanaDatBroadcastType.TransactionBroadcast) {
            return new SQSDataBroadcaster(
                txnSQSConsumerQueueUrl,
                'solana-txn',
                logger,
                sqs,
            );
        }
        return new SQSDataBroadcaster(
            blockSQSConsumerQueueUrl,
            'solana-block',
            logger,
            sqs,
        );
    },
    serviceProvider: solanaServiceProvider(solanaTestConfigProvider),
};

const solanaBlockchainScanner = new SolanaBlockchainScanner(
    {},
    solanaTestScannerProviders
);

const solanaTestScanner = solanaScanner({
    blockChainScanner: solanaBlockchainScanner,
    providers: solanaTestScannerProviders,
});

export const runSolanaTestScanner = async () => {
    await runScanner(
        async () => {
            await solanaTestScanner.start();
        },
        async () => {
            await solanaTestScanner.stop();
        }
    );
};


export const runSolanaConsumers = async () => {
    const providers: SolanaProcessorProvider = {
        serviceProvider: solanaTestScannerProviders.serviceProvider,
        dataBroadcasterProvider: solanaTestScannerProviders.dataBroadcasterProvider,
        logProvider: solanaTestScannerProviders.logProvider,
    }
    const blockConsumer = blockSQSConsumer(providers, blockSQSConsumerQueueUrl);
}