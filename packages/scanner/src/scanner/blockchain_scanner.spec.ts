import { expect } from 'chai'
import { MockClient, MockEvent, MockEventPayloads, MockEventType } from '../mocks/mock_client'
import { EventBus } from '../event_bus'
import { nullLogProvider } from '../providers/log_provider'
import { MockBlockchainScanner } from '../mocks/mock_blockchain_scanner'

describe('BlockchainScanner', () => {
    it('Test event fetch', async () => {
        const events: MockEvent[] = [
          {
            type: 'test',
            data: {},
            transactionIndex: 0,
            eventIndex: 0,
            transactionId: '1',
            blockTimestamp: '2000-01-01T00:00:00',
            blockHeight: 1,
            blockId: '1',
          },
          {
            type: 'test',
            data: {},
            transactionIndex: 0,
            eventIndex: 1,
            transactionId: '1',
            blockTimestamp: '2000-01-01T00:00:00',
            blockHeight: 1,
            blockId: '1',
          },
          {
            type: 'test',
            data: {},
            transactionIndex: 1,
            eventIndex: 0,
            transactionId: '2',
            blockTimestamp: '2000-01-01T00:00:00',
            blockHeight: 1,
            blockId: '1',
          },
          {
            type: 'test',
            data: {},
            transactionIndex: 0,
            eventIndex: 0,
            transactionId: '3',
            blockTimestamp: '2000-01-01T00:00:00',
            blockHeight: 2,
            blockId: '2',
          },
          {
            type: 'test',
            data: {},
            transactionIndex: 0,
            eventIndex: 0,
            transactionId: '4',
            blockTimestamp: '2000-01-01T00:00:00',
            blockHeight: 4,
            blockId: '4',
          },
        ]
    
        const eventBus = new EventBus()
        const mockService = new MockClient(100, events)

        const eventScanner = new MockBlockchainScanner('test',
        {
          
          latestBlockHeight: 100,
          processedBlockHeight: 0,
        }, {
          eventBusProvider: () => eventBus,
          logProvider: nullLogProvider,
          serviceProvider: async () => mockService,
        })

        eventScanner.setMaxFetchSize(4)
        eventScanner.setMaxBlocksAhead(4)
    
        const fetches: MockEventPayloads.MockEventsFetched[] = []
    
        eventBus.addRemovableListener<MockEventPayloads.MockEventsFetched>(MockEventType.MockEventsFetched, ev => fetches.push(ev))
    
        await eventScanner.process()
    
        expect(fetches).length(4)
    
        expect(fetches[0].eventType).equals('test')
        expect(fetches[0].blockHeight).equals(1)
        expect(fetches[0].events).length(3)
        expect(fetches[0].events[0]).deep.equals(events[0])
        expect(fetches[0].events[1]).deep.equals(events[1])
        expect(fetches[0].events[2]).deep.equals(events[2])
    
        expect(fetches[1].eventType).equals('test')
        expect(fetches[1].blockHeight).equals(2)
        expect(fetches[1].events).length(1)
        expect(fetches[1].events[0]).deep.equals(events[3])
    
        expect(fetches[2].eventType).equals('test')
        expect(fetches[2].blockHeight).equals(3)
        expect(fetches[2].events).length(0)
    
        expect(fetches[3].eventType).equals('test')
        expect(fetches[3].blockHeight).equals(4)
        expect(fetches[3].events).length(1)
        expect(fetches[3].events[0]).deep.equals(events[4])
      })
})