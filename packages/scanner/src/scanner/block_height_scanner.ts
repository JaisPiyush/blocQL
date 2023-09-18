import {EventPayloads, EventType, Providers} from 'types'

type BlockHeightScannerProvider = Pick<Providers, 
    "serviceProvider" | "eventBusProvider" | "logProvider">;


const PROCESS_INTERVAL_MS = 1000 // how often to fetch the latest block height (in ms)

export class BlockHeightScanner {
    private fetchTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
    private running = false;
    private currentBlockHeight: number | undefined = undefined;

    constructor(private readonly providers: BlockHeightScannerProvider) {

    }

    public async start() {
        const logger = this.providers.logProvider();

        logger.info("Starting block height scanner");
        this.running = true;
        this.process().then();
    }

    public async process() {
        
        const logger = this.providers.logProvider()

        if (this.fetchTimeout) {
            clearTimeout(this.fetchTimeout)
            this.fetchTimeout = undefined
        }

        const startTime = new Date().getTime();
        try {
           
            const serviceProvider = await this.providers.serviceProvider();
            try {
                // const startRequestTime = new Date().getTime();
                const latestBlockHeight = await serviceProvider.getLatestBlockHeight();
                
                // const endRequestTime = new Date().getTime();

                if ((this.currentBlockHeight ?? 0) < latestBlockHeight) {
                    this.currentBlockHeight = latestBlockHeight;
                    const eventBus = this.providers.eventBusProvider();
                    eventBus.emit<EventPayloads.LatestBlockHeightUpdated>(
                        EventType.LatestBlockHeightUpdated, {
                            blockHeight: latestBlockHeight
                        });
                }

            } catch (err) {
                logger.error(err)
            }
        } catch (err) {
            logger.error(err)
        }

        if (this.running) {
            this.fetchTimeout = setTimeout(() => this.process(), Math.max(0, PROCESS_INTERVAL_MS - (new Date().getTime() - startTime)))
        }

    }

    public async stop() {
        const logger = this.providers.logProvider()

        logger.info('Stopping BlockHeightScanner')

        this.running = false

        if (this.fetchTimeout) {
        clearTimeout(this.fetchTimeout)
        this.fetchTimeout = undefined
        }
    }

    async __process() {
        
        await this.process();
    }
}