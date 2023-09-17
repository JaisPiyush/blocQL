export enum EventType {
    LatestBlockHeightUpdated = 'LatestBlockHeightUpdated',
    ProcessedBlockHeighUpdated = 'ProcessedBlockHeighUpdated'
}


export namespace EventPayloads {
    export type LatestBlockHeightUpdated = {
        blockHeight: number
    }

    export type ProcessedBlockHeighUpdated<T=any> = {
        blockHeight: number,
        data: T
    }
}
