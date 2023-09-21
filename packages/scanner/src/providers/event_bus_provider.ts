import { EventBus } from '../event_bus';

export type EventBusProvider = () => EventBus;

let _eventBus: EventBus | undefined = undefined;

export const eventBusProvider: EventBusProvider = () => {
    if (!_eventBus) {
        _eventBus = new EventBus();
    }

    return _eventBus;
};
