'use strict';

const asyncIterator = {
  counter: 0,
  async next() {
    return {
      value: this.counter++,
      done: this.counter > 3,
    };
  },
};

const step1 = asyncIterator.next();
const step2 = asyncIterator.next();
const step3 = asyncIterator.next();
const step4 = asyncIterator.next(); // should not be displayed, (its done)
console.log({ step1, step2, step3, step4 });
