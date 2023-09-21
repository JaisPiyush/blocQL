export enum EventType {
    LatestBlockHeightUpdated = 'LatestBlockHeightUpdated',
    ProcessedBlockHeightUpdated = 'ProcessedBlockHeightUpdated',
}

export namespace EventPayloads {
    export type LatestBlockHeightUpdated = {
        blockHeight: number;
    };

    export type ProcessedBlockHeightUpdated<T = any> = {
        blockHeight: number;
    };
}
