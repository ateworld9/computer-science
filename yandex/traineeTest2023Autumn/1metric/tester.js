const metrikaWrapper = require('./source.js');

const wrappedFunc = metrikaWrapper(() => console.log('called'));

console.log('test1---------------------------------');
console.log(
	wrappedFunc({ login: 'a', password: 'a', date: new Date('2023-06-28') }),
);

console.log(
	wrappedFunc({ login: NaN, password: 'a', date: new Date('2023-06-28') }),
);

console.log(wrappedFunc({ login: 'c', date: new Date('2023-06-28') }));

console.log('test2---------------------------------');
const wrappedFunc2 = metrikaWrapper(() => console.log('called'));

console.log(
	wrappedFunc2({ login: 'a', password: 'a', date: new Date('2023-06-28') }),
);

console.log(
	wrappedFunc2({ login: 'b', password: 'a', date: new Date('2023-06-28') }),
);

console.log(
	wrappedFunc2({ login: 'c', password: 'c', date: new Date('2023-06-28') }),
);

console.log('test3Self---------------------------------');
const wrappedFunc3 = metrikaWrapper(() => console.log('called'));

console.log(
	wrappedFunc3({ login: 'a', password: 'a', date: new Date('2023-06-28') }),
);

console.log(
	wrappedFunc3({ login: 'b', password: 'a', date: new Date('2023-06-28') }),
);

console.log(
	wrappedFunc3({ login: 'c', password: 'c', date: new Date('2023-06-28') }),
);

console.log(
	wrappedFunc3({ login: 'a', password: 'a', date: new Date('2023-06-25') }),
);

console.log(
	wrappedFunc3({ login: 'b', password: 'a', date: new Date('2023-06-26') }),
);

console.log(
	wrappedFunc3({ login: 'c', password: 'c', date: new Date('2023-06-27') }),
);
