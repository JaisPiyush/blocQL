import { Providers, RemovableListener, ServiceProvider } from "types";
import { BlockHeightScanner } from "./block_height_scanner";
import { nullLogProvider } from "../providers/log_provider";
import { onlyDefined } from "../helpers/js-helpers";
import {eventBusProvider} from '../providers/event_bus_provider'
import { BlockchainScanner } from "./blockchain_scanner";
import { FetchedDataProcessor } from "./fetched_data_processor";

type ProvidersOptions<T extends ServiceProvider> = {
    settingsProvider: Providers<T>["settingsServiceProvider"];
    dataBroadcasterProvider: Providers["dataBroadcasterProvider"];
    eventBusProvider: Providers["eventBusProvider"];
    logProvider?: Providers["logProvider"];
    serviceProvider: Providers["serviceProvider"];
    configProvider: Providers["configProvider"];
    
}

export class Scanner<T extends ServiceProvider = ServiceProvider, 
    B extends BlockchainScanner = BlockchainScanner> {
    public processTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
    public blockHeightScanner: BlockHeightScanner | undefined = undefined;
    public listeners: RemovableListener[] = []
    public running = false
    public readonly providers: Providers;

    constructor(
        public readonly blockChainScanner: B,
        private readonly fetchedDataProcessor: FetchedDataProcessor<B>,  
        providers: ProvidersOptions<T>) {
        this.providers = {
            logProvider: nullLogProvider,
            configProvider: providers.configProvider,
            eventBusProvider: eventBusProvider,
            ...onlyDefined(providers),

        }
    }

    private createBlockchainScanner = () => {
        this.blockChainScanner.setScanner(this);
    }

    public get processedBlockHeight() {
        return this.blockChainScanner.processedBlockHeight;
    }

    public set processedBlockHeight(height: number) {
        this.blockChainScanner.processedBlockHeight = height;
    }

    public async start() {
        if (this.running) {
            return
        }

        this.running = true;

        const logger = this.providers.logProvider();
        const settings = await this.providers.settingsServiceProvider();
        const config = this.providers.configProvider();

        logger.info('Starting scanner');
        this.blockHeightScanner = new BlockHeightScanner(this.providers);
        this.processedBlockHeight = (await settings.getProcessedBlockHeight()) || 0;

        if (this.processedBlockHeight === 0) {
            if (config.defaultStartBlockHeight) {
              this.processedBlockHeight = config.defaultStartBlockHeight - 1
            } else {
              // try to get latest block and start there
              const latestBlockHeight = await (await this.providers.serviceProvider()).getLatestBlockHeight()
              this.processedBlockHeight = latestBlockHeight - 1
            }
        }

        this.createBlockchainScanner();
        await this.blockChainScanner.start();
        await this.blockHeightScanner.start()
        this.process().then()
    }

    public async stop() {
        const logger = this.providers.logProvider()
    
        logger.info('Stopping FlowScanner')
    
        for (const listener of this.listeners) {
          listener.remove()
        }
        this.listeners = []
    
        if (this.blockHeightScanner) {
          await this.blockHeightScanner.stop()
          this.blockHeightScanner = undefined
        }
    
        await this.blockChainScanner.stop()
    
        const settings = await this.providers.settingsServiceProvider()
        settings.destroy && await settings.destroy()
    
        const eventBroadcaster = await this.providers.dataBroadcasterProvider()
        eventBroadcaster.destroy && await eventBroadcaster.destroy()
    
        this.running = false
    
        if (this.processTimeout) {
          clearTimeout(this.processTimeout)
          this.processTimeout = undefined
        }
    }


    private async process() {

        if (this.processTimeout) {
            clearTimeout(this.processTimeout)
            this.processTimeout = undefined
        }
        await this.fetchedDataProcessor.process();
    }



}