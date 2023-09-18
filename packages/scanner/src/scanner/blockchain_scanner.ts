import { EventPayloads, EventType, Providers, RemovableListener } from "types";
import { Scanner } from "./scanner";

const PROCESS_INTERVAL_MS = 50 // how often to run processing loop

type BlockScannerProviders = Pick<Providers, "serviceProvider" | "eventBusProvider" | "logProvider">;

type Options = {
    latestBlockHeight: number | undefined
    processedBlockHeight: number
}

export class BlockchainScanner {
    private processTimeout: NodeJS.Timeout | undefined = undefined
    private running = false
    private latestBlockHeight: number | undefined
    private processedBlockHeight: number
    private fetchedBlockHeight: number | undefined
    private listeners: RemovableListener[] = []
    private scanner: InstanceType<typeof Scanner> | undefined;

    constructor (options: Options, private readonly providers: Providers) {
        this.latestBlockHeight = options.latestBlockHeight
        this.processedBlockHeight = options.processedBlockHeight
        this.fetchedBlockHeight = options.processedBlockHeight
    }



    setScanner = (scanner: InstanceType<typeof Scanner>) => {
        this.scanner = scanner;
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