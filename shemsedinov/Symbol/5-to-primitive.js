/* eslint-disable prefer-template */
// 'use strict'

console.log("'to Primitive' in Symbol", 'toPrimitive' in Symbol);

const person = { name: 'Dmitriy', age: 23 };

person[Symbol.toPrimitive] = function (hint) {
	console.log('hint: ', hint);

	const primitives = {
		number: () => this.age,
		string: () => this.name,
		default: () => JSON.stringify(person),
	};

	return primitives[hint]();
};

Object.defineProperty(person, Symbol.toPrimitive, {
	enumerable: false,
	configurable: false,
});

console.log(+person);
console.log(`${person}`);
console.log(person + '');
