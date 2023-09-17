export interface RemovableListener {
    remove (): void
}
  

export interface EventBusInterface {
    addRemovableListener: <T> (eventName: string, listener: (data: T) => void) => RemovableListener;
    emit: <T> (eventName: string, data: T) => void;

}