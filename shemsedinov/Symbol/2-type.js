/* eslint-disable no-shadow */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-dupe-keys */
// 'use strict'

const symbol1 = Symbol('name');

console.log('typeof =', typeof symbol1);

const obj1 = {
  name: 'Dmitriy',
  name: 'Vakhrameev',
  [Symbol('name')]: 'Dmitriy',
  [Symbol('name')]: 'Vakhrameev',
  [Symbol('name')]: Symbol('value'),
};

const key = Symbol('name');
obj1[key] = 'Antonius';
console.log('obj1[key] =', obj1[key]);
console.dir(obj1);
console.log('typeof =', typeof obj1);
console.log({ keys: Object.keys(obj1) });
for (const key in obj1) {
  console.log('Key in obj1: ', key);
  console.log('value: ', obj1[key]);
}
