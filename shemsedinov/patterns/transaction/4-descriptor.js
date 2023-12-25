/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
// 'use strict';

function Transaction() {}

Transaction.start = (data) => {
  console.log('\nstart transaction');
  let delta = {};

  const methods = {
    commit: () => {
      console.log('\ncommit transaction');
      Object.assign(data, delta);
      delta = {};
    },
    rollback: () => {
      console.log('\nrollback transaction');
      delta = {};
    },
  };

  return new Proxy(data, {
    get(target, key) {
      if (methods.hasOwnProperty(key)) return methods[key];
      if (delta.hasOwnProperty(key)) return delta[key];
      return target[key];
    },
    getOwnPropertyDescriptor(target, key) {
      console.log('getOwnPropertyDescriptor', key);
      const descriptor = Object.getOwnPropertyDescriptor(
        delta.hasOwnProperty(key) ? delta : target,
        key,
      );
      console.dir(descriptor);
      return descriptor;
    },
    set(target, key, val) {
      console.log('set', key, val);
      if (target[key] === val) delete delta[key];
      else delta[key] = val;
      return true;
    },
  });
};

// Usage

const data = { name: 'Dmitriy Vahrameev', born: 1999 };

const transaction = Transaction.start(data);
console.log('data', JSON.stringify(data));
console.log('transaction', JSON.stringify(transaction));

transaction.name = 'Ilya Zoreev';
transaction.born = 2000;
transaction.city = 'Tomsk';

console.log('\noutput with JSON.stringify:');
console.log('data', JSON.stringify(data));
console.log('transaction', JSON.stringify(transaction));

console.log('\noutput with console.dir:');
console.dir({ transaction });

console.log('\noutput with for-in:');
for (const key in transaction) {
  console.log(key, transaction[key]);
}

transaction.commit();
console.log('data', JSON.stringify(data));
console.log('transaction', JSON.stringify(transaction));
