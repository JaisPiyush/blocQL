import { expect } from 'chai'
import { EventBus } from '../event_bus';
import { MockClient } from '../mocks/mock_client';
import { BlockHeightScanner } from './block_height_scanner';
import { nullLogProvider } from '../providers/log_provider';
import { EventPayloads, EventType } from 'types';

const latestBlockHeight = 100;

describe('Test block height scanner', () => {

    it('Checking that event is emitted on new block height', async () => {
        const eventBus = new EventBus();
        const mockClient = new MockClient(latestBlockHeight);

        const blockHeightScanner = new BlockHeightScanner({
            eventBusProvider: () => eventBus,
            logProvider: nullLogProvider,
            serviceProvider: () => mockClient,

        });

        let currentBlockHeight: number | undefined = undefined

        eventBus.addRemovableListener<EventPayloads.LatestBlockHeightUpdated>(EventType.LatestBlockHeightUpdated, ev => currentBlockHeight = ev.blockHeight)

        expect(currentBlockHeight).undefined
        await blockHeightScanner.__process()
        expect(currentBlockHeight).equals(100);


    });
});