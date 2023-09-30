import { BlockchainScanner } from 'scanner/src/scanner/blockchain_scanner';
import { SolanaServiceProvider } from './providers/solana_service_provider';
import { SolanaEventPayload, SolanaEventType } from './events';
import { delay } from 'scanner';

export class SolanaBlockchainScanner extends BlockchainScanner<SolanaServiceProvider> {
    public fetchedBlockPayloads: SolanaEventPayload.SolanaBlockFetched[] = [];

    private onBlockFetched = (
        payload: SolanaEventPayload.SolanaBlockFetched
    ) => {
        this.fetchedBlockPayloads.push(payload);
    };

    protected attachListeners(): void {
        const eventBus = this.providers.eventBusProvider();
        this.scanner?.listeners.push(
            eventBus.addRemovableListener<SolanaEventPayload.SolanaBlockFetched>(
                SolanaEventType.SolanaBlockFetched,
                this.onBlockFetched
            )
        );
    }

    protected async _process(): Promise<void> {
        const logger = this.providers.logProvider();
        if (this.processTimeout) {
            clearTimeout(this.processTimeout);
            this.processTimeout = undefined;
        }

        

        if (this.latestBlockHeight !== undefined) {
            let startSlot =
                    (this.fetchedBlockHeight ?? this.processedBlockHeight) + 1; // find out where we should start this fetch
                    let endSlot = this.latestBlockHeight;
            try {
                
                    
                    if (startSlot <= endSlot) {
                        const service = await this.providers.serviceProvider();
                        const eventBus = await this.providers.eventBusProvider();

                        logger.debug(`Fetching block: ${startSlot}`);

                        const block = await service.getBlock(startSlot);
                        eventBus.emit<SolanaEventPayload.SolanaBlockFetched>(
                            SolanaEventType.SolanaBlockFetched,
                            {
                                blockSlot: startSlot,
                                data: block,
                            }
                        );
                        this.fetchedBlockHeight = startSlot;
                    }
                
            } catch (err) {
                if ((err as any).code === -32007) {
                    this.fetchedBlockHeight = startSlot;
                } else  {
                    logger.error(`Error fetching block: ${(err as any).code}`);
                    logger.error(`Error fetching block: ${err}`);
                    await delay(250 + Math.floor(Math.random() * 1000));
                }
                
            }
        }   
    }
}
