import {SQSConsumer} from 'consumer'
import { SolanaProcessorProvider } from '../processors/processor';
import { SolanaBlockProcessor } from '../processors';

const blockSQSConsumerQueueUrl = process.env.BLOCK_SQS_CONSUMER_QUEUE_URL;
const txnSQSConsumerQueueUrl = process.env.TXN_SQS_CONSUMER_QUEUE_URL;




export const blockSQSConsumer = (providers: SolanaProcessorProvider, queueUrl?: string) => {
    if (!queueUrl && !blockSQSConsumerQueueUrl) throw new Error('BLOCK_SQS_CONSUMER_QUEUE_URL is required');
    const blockProcessor = new SolanaBlockProcessor(providers);
    return new SQSConsumer({
        queueUrl: (queueUrl || blockSQSConsumerQueueUrl) as string,
        handleMessage: async (message) => {
            return await blockProcessor.process(message);
        }
    });
}

export const txnSQSConsumer = (providers: SolanaProcessorProvider,queueUrl?: string) => {
    if (!queueUrl && !txnSQSConsumerQueueUrl) throw new Error('TXN_SQS_CONSUMER_QUEUE_URL is required');
    const txnProcessor = new SolanaBlockProcessor(providers);
    return new SQSConsumer({
        queueUrl: (queueUrl || txnSQSConsumerQueueUrl) as string,
        handleMessage: async (message) => {
            return await txnProcessor.process(message);
        }
    });
}