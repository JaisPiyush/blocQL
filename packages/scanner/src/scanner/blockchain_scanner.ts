import { EventPayloads, EventType, Providers, RemovableListener } from "types";
import { Scanner } from "./scanner";

export type BlockchainScannerProviders = Pick<Providers, 'eventBusProvider' | "logProvider" | "serviceProvider">

export type Options = {
    latestBlockHeight: number | undefined
    processedBlockHeight: number
}

export class BlockchainScanner {
    protected processTimeout: NodeJS.Timeout | undefined = undefined
    protected running = false
    protected latestBlockHeight: number | undefined
    protected processedBlockHeight: number
    protected fetchedBlockHeight: number | undefined
    protected listeners: RemovableListener[] = []
    protected scanner: InstanceType<typeof Scanner> | undefined;
    
    readonly PROCESS_INTERVAL_MS = 50 // how often to run processing loop

    constructor (options: Options, 
        protected readonly providers: BlockchainScannerProviders
        ) {
        this.latestBlockHeight = options.latestBlockHeight
        this.processedBlockHeight = options.processedBlockHeight
        this.fetchedBlockHeight = options.processedBlockHeight
    }



    setScanner = (scanner: InstanceType<typeof Scanner>) => {
        this.scanner = scanner;
        this.attachListeners();
    }

    private attachListeners() {
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

    public async processFetchedData() {
        throw new Error('Not implemented');
     }

}