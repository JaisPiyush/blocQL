import {
    EventPayloads,
    EventType,
    Providers,
    RemovableListener,
    ServiceProvider,
} from 'types';
import { Scanner } from './scanner';
import { eventBusProvider, nullLogProvider } from '../providers';

export type BlockchainScannerProviders<T extends ServiceProvider> = {
    eventBusProvider?: Providers<T>['eventBusProvider'];
    logProvider?: Providers<T>['logProvider'];
    serviceProvider: Providers<T>['serviceProvider'];
};

export type Options = {
    latestBlockHeight?: number | undefined;
    processedBlockHeight?: number;
};

export class BlockchainScanner<T extends ServiceProvider = ServiceProvider> {
    protected processTimeout: NodeJS.Timeout | undefined = undefined;
    protected running = false;
    protected latestBlockHeight: number | undefined;
    public processedBlockHeight: number;
    protected fetchedBlockHeight: number | undefined;
    protected listeners: RemovableListener[] = [];
    protected scanner: Scanner | undefined;
    protected readonly providers: Required<BlockchainScannerProviders<T>>;

    protected readonly PROCESS_INTERVAL_MS = 50; // how often to run processing loop

    constructor(options: Options, _providers: BlockchainScannerProviders<T>) {
        this.latestBlockHeight = options.latestBlockHeight;
        this.processedBlockHeight = options.processedBlockHeight || 0;
        this.fetchedBlockHeight = options.processedBlockHeight;
        this.providers = {
            ..._providers,
            logProvider: _providers.logProvider || nullLogProvider,
            eventBusProvider: _providers.eventBusProvider || eventBusProvider,
        };
    }

    setScanner = (scanner: Scanner) => {
        this.scanner = scanner;
        this.attachListeners();
    };

    protected attachListeners() {
        throw new Error('Not implemented');
    }

    start = async () => {
        if (!this.scanner) {
            throw new Error('Scanner not set');
        }
        const logger = this.providers.logProvider();
        const eventBus = this.providers.eventBusProvider();

        this.listeners = [
            eventBus.addRemovableListener<EventPayloads.LatestBlockHeightUpdated>(
                EventType.LatestBlockHeightUpdated,
                this.onLatestBlockHeightUpdated
            ),
            eventBus.addRemovableListener<EventPayloads.ProcessedBlockHeightUpdated>(
                EventType.ProcessedBlockHeightUpdated,
                this.onProcessedBlockHeightUpdated
            ),
        ];
        this.running = true;
        logger.info('Starting blockchain scanner');
        this.process().then();
    };

    stop = async () => {
        for (const listener of this.listeners) {
            listener.remove();
        }
        this.listeners = [];

        this.running = false;

        if (this.processTimeout) {
            clearTimeout(this.processTimeout);
            this.processTimeout = undefined;
        }
    };

    private onLatestBlockHeightUpdated = (
        ev: EventPayloads.LatestBlockHeightUpdated
    ) => {
        this.latestBlockHeight = ev.blockHeight;
    };

    protected onProcessedBlockHeightUpdated = (
        ev: EventPayloads.ProcessedBlockHeightUpdated
    ) => {
        this.processedBlockHeight = ev.blockHeight;
    };

    __setProcessedBlockHeight = (blockHeight: number) =>
        (this.processedBlockHeight = blockHeight);

    public async process() {
        const startTime = new Date().getTime();
        await this._process();
        if (this.running) {
            setTimeout(
                () => this.process().then(),
                Math.max(
                    this.PROCESS_INTERVAL_MS -
                        (new Date().getTime() - startTime),
                    0
                )
            );
        }
    }

    protected async _process() {
        throw new Error('Not implemented');
    }
}
