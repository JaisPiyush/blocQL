import { DataBroadcast, DataBroadcasterInterface } from 'types';
import { SQS } from 'aws-sdk';
import { LogProvider } from 'types';
import { delay } from '../helpers/delay';

export interface SQSMessage {
    MessageId?: string;
    ReceiptHandle?: string;
    Body?: string;
}

export class SQSDataBroadcaster implements DataBroadcasterInterface {
    constructor(
        private readonly queueUrl: string,
        private readonly messageGroupId: string,
        private readonly logProvider: LogProvider,
        private readonly sqs: SQS
    ) {}

    broadcast = async <T>(data: DataBroadcast<T>) => {
        const logger = this.logProvider();

        // We will send all data over an SQS FIFO Queue using deduplication

        try {
            const params: SQS.SendMessageRequest = {
                MessageBody: JSON.stringify(data),
                QueueUrl: this.queueUrl,
                MessageGroupId: this.messageGroupId,
                MessageDeduplicationId: data.id,
            };

            logger.info(`Sending message to SQS: ${JSON.stringify(params)}`);

            this.sqs.sendMessage(params, (err, data) => {
                if (err) {
                    logger.error(`Error sending message to SQS: ${err}`);
                } else {
                    logger.info(`Message sent to SQS: ${JSON.stringify(data)}`);
                }
            });
        } catch (err) {
            logger.error(`Error sending message to SQS: ${err}`);
            await delay(Math.floor(4 * 500 + Math.random() * 500));
        }
        logger.debug(`Sent ${data} events in SQS messages`);
    };
}
