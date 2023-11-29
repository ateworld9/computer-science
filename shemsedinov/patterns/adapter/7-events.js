// 'use strict'

const { EventEmitter } = require("node:events");

class AdaptiveEmmiter extends EventEmitter {
  constructor() {
    super();
    this.transformations = {};
  }

  transform(from, to, fn) {
    this.transformations[from] = { to, fn };
  }

  emit(name, ...args) {
    const transform = this.transformations[name];
    if (transform) {
      super.emit(transform.to, transform.fn(...args));
    }
    super.emit(name, ...args);
  }
}

// Usage
const adaptiveEmitter = new AdaptiveEmmiter();

adaptiveEmitter.transform("timer", "timeout", (date) => [
  date.toLocaleString(),
]);

adaptiveEmitter.on("timeout", (date) => {
  console.dir({ date });
});

setTimeout(() => {
  const date = new Date();
  console.log("new Date():", date);
  adaptiveEmitter.emit("timer", date);
}, 5000);
