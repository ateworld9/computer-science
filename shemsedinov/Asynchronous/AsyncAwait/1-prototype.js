'use strict';

console.log(Function); // [Function: Function]

const AsyncFunction = (async () => {}).constructor;

console.log(AsyncFunction); // [Function: AsyncFunction]

const fn = () => {};
const afn = async () => {};

console.dir({
	fn: typeof fn, // 'function'
	afn: typeof afn, // 'function'
});

console.log(fn instanceof Function); // true
console.log(afn instanceof Function); // true
console.log(fn instanceof AsyncFunction); // false
console.log(afn instanceof AsyncFunction); // true

console.log(afn.__proto__.constructor); // [Function: AsyncFunction]
console.log(afn.__proto__.__proto__.constructor); // [Function: Function]
console.log(afn.__proto__.__proto__.__proto__.constructor); // [Function: Object]

console.log();

console.log(Object.getPrototypeOf(afn).constructor); // [Function: AsyncFunction]
console.log(Object.getPrototypeOf(Object.getPrototypeOf(afn)).constructor); // [Function: Function]
console.log(
	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(afn)))
		.constructor,
); // [Function: Object]
