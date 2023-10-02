import { FlowEvent } from "../types";

export enum FlowEventType {
    FlowEventFetched = 'FlowEventFetched',
}

export namespace FlowEventPayload {
    export type FlowEventFetched = {
        blockHeight: number;
        events: FlowEvent[];
    };
}
