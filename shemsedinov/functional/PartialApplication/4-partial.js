'use strict';

const partial =
	(fn, x) =>
	(...args) =>
		fn(x, ...args);

// Usage

const sum4 = (a, b, c, d) => a + b + c + d;

const f11 = partial(sum4, 1);
const f12 = partial(f11, 2);
const f13 = partial(f12, 2);
const y1 = partial(f13, 1);

console.log(y1);

const f21 = partial(sum4, 1, 2);
const f22 = partial(sum4, 1, 2);
const y2 = partial(f22, 1);

console.log(y2);
