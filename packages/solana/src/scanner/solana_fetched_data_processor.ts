import { FetchedDataProcessor } from "scanner";
import { SolanaBlockchainScanner } from "./solana_blockchain_scanner";
import { EventPayloads, EventType } from "types";

export class SolanaFetchedDataScanner extends FetchedDataProcessor<SolanaBlockchainScanner> {

    
    public async process() {
        const logger = this.scanner.providers.logProvider();
        if (this.scanner.processTimeout) {
            clearTimeout(this.scanner.processTimeout)
            this.scanner.processTimeout = undefined
        }
        try {
            const eventBus = this.scanner.providers.eventBusProvider();
            const settingsService = await this.scanner.providers.settingsServiceProvider();
            if (this.scanner.blockChainScanner.fetchedBlockPayloads) {
                const eventBroadcaster = await this.scanner.providers.dataBroadcasterProvider();
                for (const blockPayload of this.scanner.blockChainScanner.fetchedBlockPayloads) {
                    await eventBroadcaster.broadcast({
                        id: blockPayload.blockSlot.toString(),
                        data: blockPayload.data
                    });
                }
            }
            this.scanner.processedBlockHeight += 1;
            await settingsService.setProcessedBlockHeight(this.scanner.processedBlockHeight);
            eventBus.emit<EventPayloads.ProcessedBlockHeightUpdated>(EventType.ProcessedBlockHeightUpdated, 
                { blockHeight: this.scanner.processedBlockHeight })
        } catch (err) {
            logger.error(`Error processing fetched block: ${err}`);
        }
    }
}