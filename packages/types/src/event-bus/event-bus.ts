export interface RemovableListener {
    remove (): void
}
  

export interface EventBus {
    addRemovableListener: <T> (eventName: string, listener: (data: T) => void) => RemovableListener;
    emit: <T> (eventName: string, data: T) => void;

}