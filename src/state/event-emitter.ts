export interface EventEmitterCallback<T> {(data: T): void}

export default class EventEmitter<T> {
  private events: {[key: string]: EventEmitterCallback<T>[]};

  constructor() {
    this.events = {};
  }

  public on(event: string, listener: EventEmitterCallback<T>) {
    if (!this.events[event])
      this.events[event] = [];
    this.events[event].push(listener);
  }

  public removeListener(event: string, listener: EventEmitterCallback<T>) {
    if (this.events[event]) {
      const index = this.events[event].indexOf(listener)
      if (index > -1)
        this.events[event].splice(index, 1);
    }
  }

  public emit(event: string, data: T) {
    if (this.events[event]) {
      for (const callback of this.events[event])
        callback.apply(this, [data]);
    }
  }
}
