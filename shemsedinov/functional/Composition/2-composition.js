'use strict';

const compose = (f, g) => (x) => f(g(x));

// Usage

const upperFirst = (word) => word.charAt(0).toUpperCase() + word.slice(1);
const upperCapital = (str) => str.split(' ').map(upperFirst).join(' ');
const lower = (s) => s.toLowerCase();

const capitalize = compose(upperCapital, lower);

const s = 'DMITRIY VAHRAMEEV';

console.log(s);
console.log(`lower('${s}') = '${lower(s)}'`);
console.log(`upperCapital('${s}') = '${upperCapital(s)}'`);
console.log(`capitalize('${s}') = '${capitalize(s)}'`);
