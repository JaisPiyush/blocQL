import {DataBroadcast, DataBroadcasterInterface} from 'types';

export class ConsoleDataBroadcaster implements DataBroadcasterInterface {
    broadcast = async <T = any>(data: DataBroadcast<T>) =>  {
        console.log(data);
    }
}