'use strict';

const iterable = {
  [Symbol.iterator]() {
    let i = 0;
    const iterator = {
      next() {
        return {
          value: i++,
          done: i > 3,
        };
      },
    };
    return iterator;
  },
};

// Usage

const iterator = iterable[Symbol.iterator]();

const step1 = iterator.next();
const step2 = iterator.next();
const step3 = iterator.next();
const step4 = iterator.next(); // should not be displayed, (its done)
console.log({ step1, step2, step3, step4 });

for (const step of iterable) {
  console.log({ step });
}
