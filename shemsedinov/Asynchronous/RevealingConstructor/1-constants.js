'use strict';

const scalarConstant = 5;
const functionalConstant = () => 6;
const callbackConstant = (f) => f(7);

const fn = (x, f, g) => {
  console.log({ x });
  console.log({ y: f() });
  g((z) => {
    console.log({ z });
  });
};

fn(scalarConstant, functionalConstant, callbackConstant);
