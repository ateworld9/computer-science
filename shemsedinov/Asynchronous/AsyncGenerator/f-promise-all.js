'use strict';

async function* ids(...args) {
  let i = 0;
  while (args.length > i) {
    const id = args[i++];
    if (id === undefined) return undefined;

    yield id;
  }
}

(async () => {
  const id = ids(1011, 1078, 1292, 1731, undefined, 1501, 1550);
  Promise.all([
    id.next(),
    id.next(),
    id.next(),
    id.next(),
    id.next(),
    id.next(),
    id.next(),
  ]).then(console.log);
})();
