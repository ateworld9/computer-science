'use strict';

const gen = function* () {
  yield* [1, 2, 3];
};

{
  const iterable = gen();
  const iterator = iterable;

  const step1 = iterator.next();
  const step2 = iterator.next();
  const step3 = iterator.next();
  const step4 = iterator.next(); // should not be displayed, (its done)
  console.log({ step1, step2, step3, step4 });
}

{
  for (const step of gen()) {
    console.log(step);
  }
}

{
  console.log([...gen()]);
}
