type ObserverFn<T> = (data?: T) => void;

export abstract class Observer<T = any> {
  constructor(private _observers: ObserverFn<T>[] = []) {}

  public subscribe(observer: ObserverFn<T>) {
    this._observers.push(observer);
  }

  protected _notfyAll(data?: T) {
    for (const observer of this._observers) {
      observer(data);
    }
  }
}
