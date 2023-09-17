import * as EventEmitter from 'event-emitter';
import { EventBusInterface, RemovableListener } from 'types';

export class EventBus implements EventBusInterface {
    private eventEmitter = new EventEmitter()


    addRemovableListener = <T>(eventName: string, listener: (data: T) => void): RemovableListener  => {
      this.eventEmitter.on(eventName, listener);
      return  {
        remove: () => this.eventEmitter.off(eventName, listener)
      }
    }

    emit = <T>(eventName: string, data: T) =>  {
      this.eventEmitter.emit(eventName, data);
    }

}
