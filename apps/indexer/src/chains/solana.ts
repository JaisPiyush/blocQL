import { ProvidersOptions, SQSDataBroadcaster, Scanner } from 'scanner';
import {
    SolanaBlockchainScanner,
    SolanaConfig,
    SolanaServiceProvider,
    blockSQSConsumer,
    solanaScanner,
    solanaServiceProvider,
    txnSQSConsumer,
    web3,
} from 'solana';
import { MemorySettingsService } from 'scanner/src/settings/memory_settings_service';
import { logger } from '../logger';
import { runScanner, runner } from '../runners';
import {SQS} from 'aws-sdk';
import { SolanaDataBroadcastType, SolanaDatastoreName } from 'solana/src/types';
import { SolanaProcessorProvider } from 'solana/src/processors/processor';
import { DatastoreProvider } from 'types';
import {getSolanaKnex, Knex,  SolanaAccountActivityDatastore, SolanaInstructionCallsDatastore, SolanaRewardsDatastore, SolanaTokenMetadatasDatastore, SolanaTransactionsDatastore, SolanaVoteTransactionsDatastore,} from 'datastore'

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
        if (t === SolanaDataBroadcastType.TransactionBroadcast) {
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

const datastoreProvider = (knex: Knex): DatastoreProvider => async (storeName: string) => {
    switch (storeName) {
        case SolanaDatastoreName.TransactionDatastore:
            return new SolanaTransactionsDatastore(knex);
        case SolanaDatastoreName.RewardDatastore:
            return new SolanaRewardsDatastore(knex);
        case SolanaDatastoreName.VoteTransactionDatastore:
            return new SolanaVoteTransactionsDatastore(knex);
        case SolanaDatastoreName.InstructionDatastore:
            return new SolanaInstructionCallsDatastore(knex);
        case SolanaDatastoreName.TokenDatastore:
            return new SolanaTokenMetadatasDatastore(knex);
        case SolanaDatastoreName.AccountActivityDatastore:
            return new SolanaAccountActivityDatastore(knex);
        default:
            throw new Error('Datastore not found');
    }
}


export const runSolanaConsumers = async () => {

    const knex = getSolanaKnex({});

    const providers: SolanaProcessorProvider = {
        serviceProvider: solanaTestScannerProviders.serviceProvider,
        dataBroadcasterProvider: solanaTestScannerProviders.dataBroadcasterProvider,
        logProvider: solanaTestScannerProviders.logProvider,
        datastoreProvider: datastoreProvider(knex),
    }
    const blockConsumer = blockSQSConsumer(providers, blockSQSConsumerQueueUrl);
    const txnConsumer = txnSQSConsumer(providers, txnSQSConsumerQueueUrl);

    await runner(
        async () => {
            await blockConsumer.start();
            await txnConsumer.start();
        },
        async () => {
            await blockConsumer.stop();
            await txnConsumer.stop();
        }
    );


}