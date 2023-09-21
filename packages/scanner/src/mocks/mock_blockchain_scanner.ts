
import { Providers, ServiceProvider } from "types";
import { delay } from "../helpers/delay";
import { BlockchainScanner, BlockchainScannerProviders, Options } from "../scanner/blockchain_scanner";
import { MockClient, MockEvent, MockEventPayloads, MockEventType } from "./mock_client";
import  * as _ from 'lodash';

export class MockBlockchainScanner extends BlockchainScanner {
    private maxFetchSize = 50
    private maxBlocksAhead = 100
    processedBlockHeight: number = 0

    constructor (private eventType: string,options: Options, 
      providers: BlockchainScannerProviders<ServiceProvider>) {
        super(options, providers);
    }

    setMaxFetchSize = (maxFetchSize: number) => {
      this.maxFetchSize = maxFetchSize
    }
  
    setMaxBlocksAhead = (maxBlocksAhead: number) => {
      this.maxBlocksAhead = maxBlocksAhead
    }

    __setProcessedBlockHeight = (blockHeight: number) => this.processedBlockHeight = blockHeight

    __getEventType = () => this.eventType

    public async process() {
        const logger = this.providers.logProvider()
    
        if (this.processTimeout) {
          clearTimeout(this.processTimeout)
          this.processTimeout = undefined
        }
    
        const startTime = new Date().getTime()
    
        try {
          if (this.latestBlockHeight) {
            let startHeight = (this.fetchedBlockHeight ?? this.processedBlockHeight) + 1 // find out where we should start this fetch
            let endHeight = Math.min(this.latestBlockHeight, startHeight + this.maxFetchSize - 1) // try to fetch max blocks
            endHeight = Math.min(endHeight, this.processedBlockHeight + this.maxBlocksAhead) // respect max lookahead
    
            if (startHeight <= endHeight) {
              const flowService = (await this.providers.serviceProvider()) as MockClient
              const eventBus = await this.providers.eventBusProvider()
    
              // we have new blocks to fetch
              let fetchSize = endHeight - startHeight + 1
              while (true) {
                let errors = 0
                let minErrors = 0
                let endHeight = startHeight + fetchSize - 1
                try {
                //   const startRequestTime = new Date().getTime()
                  const events = await flowService.getEvents(this.eventType, startHeight, endHeight)
                //   const endRequestTime = new Date().getTime()
    
                  // group events by block height
                  const groupedEvents: {[key: string]: MockEvent[]} = _.groupBy(events, e => String(e.blockHeight))
    
                  // FIXME: there is a potential issue here where we might request blocks past the current block height, or the access node we hit might
                  //        be behind the blockchain. We don't know for sure if there were no events in a block or if the block did not exist yet. The Go
                  //        SDK returns a result for every block with an empty events array, but JS does not.
    
                  for (let i = startHeight; i <= endHeight; ++i) {
                    // emit event for each block with the events in that block
                    eventBus.emit<MockEventPayloads.MockEventsFetched>(MockEventType.MockEventsFetched, {
                      eventType: this.eventType,
                      blockHeight: i,
                      events: groupedEvents[String(i)] ?? [],
                    })
                    this.fetchedBlockHeight = i
                  }
    
    
                  break
                } catch (err: any) {
                  logger.error(`Error fetching events ${this.eventType} (${startHeight} - ${endHeight}): ${err}`)
                  ++errors
                  if (fetchSize > 1) {
                    // sometimes there are too many events in the response for the access nodes to handle, try to back off on our fetch size
                    fetchSize = Math.max(Math.floor(fetchSize / 4), 1) // try to fetch less blocks at a time
                    endHeight = startHeight + fetchSize - 1
                  } else if (++minErrors > 3) {
                    // we've had repeated errors fetching a single block, error out
                    throw err
                  } else {
                    // delay on errors fetching single blocks
                    await delay(250 * errors + Math.floor(Math.random() * 1000))
                  }
                }
              }
            }
          }
        } catch (err) {
          logger.error(err)
        }
    
        if (this.running) {
          setTimeout(() => this.process().then(), Math.max(this.PROCESS_INTERVAL_MS - (new Date().getTime() - startTime), 0))
        }
      }
}