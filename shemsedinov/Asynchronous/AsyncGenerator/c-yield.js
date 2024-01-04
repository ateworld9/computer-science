'use strict';

async function* counter(begin, end, delta = 1) {
	let value = begin;
	let nextValue = begin + delta;
	while (true) {
		value += nextValue;
		nextValue += delta;
		if (nextValue > end) return value;
		else yield value;
	}
}

const c = counter(0, 30, 12);

console.log(c);
const val1 = c.next().then(console.log);
const val2 = c.next().then(console.log);
const val3 = c.next().then(console.log);
const val4 = c.next().then(console.log);
