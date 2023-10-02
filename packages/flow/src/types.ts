export interface FlowCollection {
    id: string;
    transactionIds: string[];
}

export interface FlowEvent {
    type: string;
    transactionId: string;
    transactionIndex: number;
    eventIndex: number;
    data: object;
}

export interface FlowTransactionStatus {
    blockId: string;
    status: number;
    statusString: string;
    statusCode: number;
    errorMessage: string;
    events: FlowEvent[];
}

export interface CollectionGuaranteesObject {
    collectionId: string;
    signerIds?: unknown[];
}

export type FlowBlock = Record<string, unknown> & {
    id: string;
    height: number;
    timestamp: string;
    collectionGuarantees: CollectionGuaranteesObject[];
};