import { expect } from "chai";

import EventEmitter, { EventEmitterCallback } from "../../src/state/event-emitter";

class Counter extends EventEmitter<number> {
  public counter: number;
  constructor() {
    super();
    this.counter = 0;
  }

  public increase() {
    this.counter++;
    this.emit('change', this.counter);
  }
}

describe('emitter', () => {
  it('emits', () => {
    const counter = new Counter();
    let count = 0;
    const callback: EventEmitterCallback<number> = value => {
      // Add instead of assign to make sure each callback contribute
      // to the test output
      count += value;
    };
    counter.on("change", callback);

    counter.increase();
    counter.increase();
    counter.increase();

    expect(count).equal(6);
  });

  it('removes', () => {
    const counter = new Counter();
    let count = 0;
    const callback: EventEmitterCallback<number> = value => {
      count = value;
    };
    counter.on("change", callback);
    counter.removeListener("change", callback);

    counter.increase();

    expect(count).equal(0);
  });
});
