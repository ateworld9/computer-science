'use strict';

function* ids(...args) {
  let i = 0;
  while (args.length > i) {
    const id = args[i++];
    if (id === undefined) return Promise.resolve(undefined);
    yield Promise.resolve(id);
  }
}

const id = ids(1011, 1078, 1292, 1731, undefined, 1501, 1550);
Promise.all([...id]).then(console.log);
