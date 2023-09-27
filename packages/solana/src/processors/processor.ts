import { ProvidersOptions, SQSMessage, nullLogProvider } from 'scanner';
import { SolanaServiceProvider } from '../scanner/providers/solana_service_provider';
import { BroadcastData } from '../types';
import { DatastoreProvider } from 'types';

export type SolanaProcessorProvider = {
    serviceProvider: ProvidersOptions<SolanaServiceProvider>['serviceProvider'];
    dataBroadcasterProvider: ProvidersOptions<SolanaServiceProvider>['dataBroadcasterProvider'];
    logProvider?: ProvidersOptions<SolanaServiceProvider>['logProvider'];
    datastoreProvider: DatastoreProvider;
};

export class SolanaProcessor<M> {
    protected readonly providers: Required<SolanaProcessorProvider>;
    constructor(providers: SolanaProcessorProvider) {
        this.providers = {
            logProvider: providers.logProvider || nullLogProvider,
            ...providers,
        };
    }

    public async process(message: SQSMessage) {
        const logger = this.providers.logProvider();
        logger.info(`Processing message ${message.Body}`);
        const body = JSON.parse(message.Body as string) as {
            id: string;
            data: BroadcastData<M>;
        };
        logger.info(`Processing finished.}`);
        try {
            await this.__process(body.data);
        } catch (err) {
            logger.error(`Error processing message ${message.Body}: ${err}`);
        }
    }

    // completion of this process without error will be considered a success and will remove the
    // message from the queue
    protected async __process(data: BroadcastData<M>) {
        throw new Error('Method not implemented.');
    }
}
