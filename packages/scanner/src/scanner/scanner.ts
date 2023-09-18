import { Providers, RemovableListener } from "types";
import { BlockHeightScanner } from "./block_height_scanner";
import { nullLogProvider } from "../providers/log_provider";
import { onlyDefined } from "../helpers/js-helpers";
import {eventBusProvider} from '../providers/event_bus_provider'
import { BlockchainScanner } from "./blockchain_scanner";

type ProvidersOptions = {
    settingsProvider: Providers["settingsServiceProvider"];
    dataBroadcasterProvider: Providers["dataBroadcasterProvider"];
    eventBusProvider: Providers["eventBusProvider"];
    logProvider?: Providers["logProvider"];
    serviceProvider: Providers["serviceProvider"];
    configProvider: Providers["configProvider"];
    
}

export class Scanner {
    private processTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
    private blockHeightScanner: BlockHeightScanner | undefined = undefined;
    private listeners: RemovableListener[] = []
    private running = false
    private processedBlockHeight: number = 0
    private readonly providers: Providers;

    constructor(private readonly blockChainScanner: InstanceType<typeof BlockchainScanner> ,  providers: ProvidersOptions) {
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

    public async start() {
        if (this.running) {
            return
        }

        this.running = true;

        const logger = this.providers.logProvider();
        const eventBus = this.providers.eventBusProvider();
        const settings = await this.providers.settingsServiceProvider();
        const config = this.providers.configProvider();

        logger.info('Starting scanner');
        this.blockHeightScanner = new BlockHeightScanner(this.providers);
        this.processedBlockHeight = await settings.getProcessedBlockHeight();

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
        const logger = this.providers.logProvider()

        if (this.processTimeout) {
            clearTimeout(this.processTimeout)
            this.processTimeout = undefined
        }
        await this.blockChainScanner.process();
    }



}