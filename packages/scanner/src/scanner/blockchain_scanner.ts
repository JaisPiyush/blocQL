import { EventPayloads, EventType, Providers, RemovableListener, ServiceProvider } from "types";
import { Scanner } from "./scanner";

export type BlockchainScannerProviders<T extends ServiceProvider> = 
    Pick<Providers<T>, 'eventBusProvider' | "logProvider" | "serviceProvider">;

export type Options = {
    latestBlockHeight: number | undefined
    processedBlockHeight: number
}

export class BlockchainScanner<T extends ServiceProvider = ServiceProvider> {
    protected processTimeout: NodeJS.Timeout | undefined = undefined
    protected running = false
    protected latestBlockHeight: number | undefined
    public processedBlockHeight: number
    protected fetchedBlockHeight: number | undefined
    protected listeners: RemovableListener[] = []
    protected scanner: Scanner | undefined;
    
    readonly PROCESS_INTERVAL_MS = 50 // how often to run processing loop

    constructor (options: Options, 
        protected readonly providers: BlockchainScannerProviders<T>
        ) {
        this.latestBlockHeight = options.latestBlockHeight
        this.processedBlockHeight = options.processedBlockHeight
        this.fetchedBlockHeight = options.processedBlockHeight
    }



    setScanner = (scanner: Scanner) => {
        this.scanner = scanner;
        this.attachListeners();
    }

    protected attachListeners() {
        throw new Error('Not implemented');
    }

    start = async () => {
        if (!this.scanner) {
            throw new Error('Scanner not set');
        }
        const eventBus = this.providers.eventBusProvider()
    
        this.listeners = [
          eventBus.addRemovableListener<EventPayloads.LatestBlockHeightUpdated>(EventType.LatestBlockHeightUpdated, this.onLatestBlockHeightUpdated),
          eventBus.addRemovableListener<EventPayloads.ProcessedBlockHeightUpdated>(EventType.ProcessedBlockHeightUpdated, this.onProcessedBlockHeightUpdated),
        ]
        this.running = true
        this.process().then()
    }

    stop = async () => {
        for (const listener of this.listeners) {
          listener.remove()
        }
        this.listeners = []
    
        this.running = false
    
        if (this.processTimeout) {
          clearTimeout(this.processTimeout)
          this.processTimeout = undefined
        }
    }

    private onLatestBlockHeightUpdated = (ev: EventPayloads.LatestBlockHeightUpdated) => {
        this.latestBlockHeight = ev.blockHeight
    }
    
    private onProcessedBlockHeightUpdated = (ev: EventPayloads.ProcessedBlockHeightUpdated) => {
        this.processedBlockHeight = ev.blockHeight
    }

    
    __setProcessedBlockHeight = (blockHeight: number) => this.processedBlockHeight = blockHeight;

    public async process() {
        
        throw new Error('Not implemented');

    }

}