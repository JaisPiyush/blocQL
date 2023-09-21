import { EventBusInterface } from '../event-bus/event-bus';

export type EventBusProvider = () => EventBusInterface;
