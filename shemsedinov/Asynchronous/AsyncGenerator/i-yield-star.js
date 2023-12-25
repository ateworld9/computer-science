'use strict';

async function* genFn() {
  // yield* [10, 20, 30];
  yield* new Set([10, 20, 30]);
}

const c = genFn();
const val1 = c.next().then(console.log);
const val2 = c.next().then(console.log);
const val3 = c.next().then(console.log);
const val4 = c.next().then(console.log);
console.log({ c, val1, val2, val3, val4 });
