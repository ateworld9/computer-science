'use strict';

async function* counter(begin, end, delta = 1) {
	let value = begin;
	let nextValue = begin + delta;
	while (true) {
		value += nextValue;
		nextValue += delta;
		if (nextValue > end) return value;
		const back = yield value;
		if (back) {
			value += back;
			nextValue += back;
			if (nextValue > end) return;
		}
	}
}

const c = counter(0, 30, 12);

const val1 = c.next().then(console.log);
const val2 = c.next().then(console.log);
const val3 = c.next(150).then(console.log);
const val4 = c.next().then(console.log);
console.log({ c, val1, val2, val3, val4 });
