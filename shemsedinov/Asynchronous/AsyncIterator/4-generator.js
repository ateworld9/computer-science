'use strict';

const gen = async function* () {
  let i = 0;

  while (true) {
    if (i >= 3) return;
    yield i++;
  }
};

{
  const iterable = gen();
  const iterator = iterable[Symbol.asyncIterator]();

  const step1 = iterator.next();
  const step2 = iterator.next();
  const step3 = iterator.next();
  const step4 = iterator.next(); // should not be displayed, (its done)

  Promise.all([step1, step2, step3, step4]).then((steps) => {
    console.log(steps);
  });
}
