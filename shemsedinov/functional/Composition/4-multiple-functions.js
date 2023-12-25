'use strict';

const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((prev, curr) => curr(prev), x);

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((prev, curr) => prev(curr), x);

const upperFirst = (word) => word.charAt(0).toUpperCase() + word.slice(1);
const upperCapital = (s) => s.split(' ').map(upperFirst).join(' ');
const lower = (s) => s.toLowerCase();
const trim = (s) => s.trim();

const s = '   DMITRIY VAHRAMEEV   ';
console.log(s);
console.log(`lower('${s}') = '${lower(s)}'`);
console.log(`upperCapital('${s}') = '${upperCapital(s)}'`);

{
  console.log('Use compose');
  const capitalize = compose(upperCapital, lower, trim);
  console.log(`capitalize('${s}') = '${capitalize(s)}'`);
}

{
  console.log('Use pipe');
  const capitalize = pipe(trim, lower, upperCapital);
  console.log(`capitalize('${s}') = '${capitalize(s)}'`);
}
