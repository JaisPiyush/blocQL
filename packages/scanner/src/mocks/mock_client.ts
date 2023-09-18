import { BaseBlock, ServiceProvider } from "types";

export interface MockBlock extends BaseBlock {
    id: string;
}

export enum MockEventType {
    MockEventsFetched = 'MockEventsFetched',
}

export namespace MockEventPayloads {
    export type MockEventsFetched = {
        eventType: string
        blockHeight: number
        events: MockEvent[]
    }
}
export type MockEvent = {
    blockId: string
    blockHeight: number
    blockTimestamp: string
    type: string
    transactionId: string
    transactionIndex: number
    eventIndex: number
    data: any
  }

export class MockClient extends ServiceProvider  {
    constructor(
        private latestBlockHeight: number,
        private events: MockEvent[] = [],
        private onGetEvents?: (eventType: string, startHeight: number, endHeight: number) => void

    ) {
        super();
    }

    getEvents = async (eventType: string, startHeight: number, endHeight: number): Promise<MockEvent[]> => {
        if (this.onGetEvents) {
          this.onGetEvents(eventType, startHeight, endHeight)
        }
        return this.events.filter(e => e.type === eventType && e.blockHeight >= startHeight && e.blockHeight <= endHeight)
      }

    async getLatestBlockHeight(): Promise<number> {
        return this.latestBlockHeight;
    }

    async getBlock(height: number): Promise<MockBlock> {
        return {
            id: `block-${height}`,
            blockHeight: height,
        };
    }

    setLatestBlockHeight(height: number) {
        this.latestBlockHeight = height;
    }
}