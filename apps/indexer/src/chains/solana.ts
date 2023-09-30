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
import  {DbSettingsService} from 'scanner/src/settings/db_settings_service';
import { logger } from '../logger';
import { runScanner, runner } from '../runners';
import { SQS } from 'aws-sdk';
import { SolanaDataBroadcastType, SolanaDatastoreName } from 'solana/src/types';
import { SolanaProcessorProvider } from 'solana/src/processors/processor';
import { DatastoreProvider } from 'types';
import {
    getSolanaKnex,
    Knex,
    SolanaAccountActivityDatastore,
    SolanaBlockDatastore,
    SolanaInstructionCallsDatastore,
    SolanaRewardsDatastore,
    SolanaTokenMetadatasDatastore,
    SolanaTransactionsDatastore,
    SolanaVoteTransactionsDatastore,
} from 'datastore';

const blockSQSConsumerQueueUrl = process.env.BLOCK_SQS_CONSUMER_QUEUE_URL;
const txnSQSConsumerQueueUrl = process.env.TXN_SQS_CONSUMER_QUEUE_URL;

if (!blockSQSConsumerQueueUrl)
    throw new Error('BLOCK_SQS_CONSUMER_QUEUE_URL is required');
if (!txnSQSConsumerQueueUrl)
    throw new Error('TXN_SQS_CONSUMER_QUEUE_URL is required');

const sqs = new SQS({ apiVersion: '2012-11-05' });

const solanaTestConfigProvider = () => ({
    endpoint: process.env.SOLANA_RPC_URL || web3.clusterApiUrl('mainnet-beta'),
    maxRequestPerSecond: 5,
    defaultStartBlockHeight: 220575944,
});
const knex = getSolanaKnex({});

const solanaTestScannerProviders: ProvidersOptions<
    SolanaServiceProvider,
    SolanaConfig
> = {
    settingsServiceProvider: async () => new DbSettingsService(knex, 'settings', 'solana-processed-block-height'),
    configProvider: solanaTestConfigProvider,
    dataBroadcasterProvider: async (t?: string) => {
        if (t === SolanaDataBroadcastType.TransactionBroadcast) {
            return new SQSDataBroadcaster(
                txnSQSConsumerQueueUrl,
                'solana-txn',
                logger,
                sqs
            );
        }
        return new SQSDataBroadcaster(
            blockSQSConsumerQueueUrl,
            'solana-block',
            logger,
            sqs
        );
    },
    serviceProvider: solanaServiceProvider(solanaTestConfigProvider),
    logProvider: logger
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

const datastoreProvider =
    (knex: Knex): DatastoreProvider =>
    async (storeName: string) => {
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
            case SolanaDatastoreName.BlockDatastore:
                return new SolanaBlockDatastore(knex);
            default:
                throw new Error('Datastore not found');
        }
    };

export const runSolanaConsumers = async (consumer?: string) => {
    if (consumer === 'block') {
        await runSolanaBlockConsumer();
    } else if (consumer === 'txn') {
        await runSolanaTxnConsumer();
    } else {
        await runSolanaBlockConsumer();
        await runSolanaTxnConsumer();
    }
};

export const runSolanaBlockConsumer = async () => {
    

    const providers: SolanaProcessorProvider = {
        serviceProvider: solanaTestScannerProviders.serviceProvider,
        dataBroadcasterProvider:
            solanaTestScannerProviders.dataBroadcasterProvider,
        logProvider: solanaTestScannerProviders.logProvider,
        datastoreProvider: datastoreProvider(knex),
    };
    const blockConsumer = blockSQSConsumer(providers, blockSQSConsumerQueueUrl);

    await runner(
        async () => {
            await blockConsumer.start();
        },
        async () => {
            await blockConsumer.stop();
        },
        'solana-block-consumers'
    );
};

export const runSolanaTxnConsumer = async () => {

    const providers: SolanaProcessorProvider = {
        serviceProvider: solanaTestScannerProviders.serviceProvider,
        dataBroadcasterProvider:
            solanaTestScannerProviders.dataBroadcasterProvider,
        logProvider: solanaTestScannerProviders.logProvider,
        datastoreProvider: datastoreProvider(knex),
    };
    const txnConsumer = txnSQSConsumer(providers, txnSQSConsumerQueueUrl);

    await runner(
        async () => {
            await txnConsumer.start();
        },
        async () => {
            await txnConsumer.stop();
        },
        'solana-txn-consumers'
    );
};
