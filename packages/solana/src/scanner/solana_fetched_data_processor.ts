import { FetchedDataProcessor, Scanner } from "scanner";
import { SolanaBlockchainScanner } from "./solana_blockchain_scanner";
import { EventPayloads, EventType, ServiceProvider } from "types";

export class SolanaFetchedDataProcessor extends FetchedDataProcessor<SolanaBlockchainScanner> {

    
    public async process(scanner: Scanner<ServiceProvider, SolanaBlockchainScanner>) {
        const logger = scanner.providers.logProvider();
        if (scanner.processTimeout) {
            clearTimeout(scanner.processTimeout)
            scanner.processTimeout = undefined
        }
        try {
            const eventBus = scanner.providers.eventBusProvider();
            const settingsService = await scanner.providers.settingsServiceProvider();
            if (scanner.blockChainScanner.fetchedBlockPayloads) {
                const eventBroadcaster = await scanner.providers.dataBroadcasterProvider();
                for (const blockPayload of scanner.blockChainScanner.fetchedBlockPayloads) {
                    // TODO: Store block data and reward data and broadcast txns
                    await eventBroadcaster.broadcast({
                        id: blockPayload.blockSlot.toString(),
                        data: blockPayload.data
                    });
                    await settingsService.setProcessedBlockHeight(scanner.processedBlockHeight);
                    eventBus.emit<EventPayloads.ProcessedBlockHeightUpdated>(EventType.ProcessedBlockHeightUpdated, 
                        { blockHeight: blockPayload.blockSlot }
                    )
                }
                scanner.blockChainScanner.fetchedBlockPayloads = [];
            }
            
        } catch (err) {
            logger.error(`Error processing fetched block: ${err}`);
        }
    }
}