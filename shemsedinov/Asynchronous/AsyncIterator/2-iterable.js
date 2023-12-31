'use strict';

const iterable = {
	[Symbol.asyncIterator]() {
		let i = 0;

		const iterator = {
			async next() {
				return {
					value: i++,
					done: i > 3,
				};
			},
		};

		return iterator;
	},
};

const iterator = iterable[Symbol.asyncIterator]();

const step1 = iterator.next();
const step2 = iterator.next();
const step3 = iterator.next();
const step4 = iterator.next(); // should not be displayed, (its done)
console.log({ step1, step2, step3, step4 });

(async () => {
	for await (const step of iterable) {
		console.log({ step });
	}
})();

(async () => {
	// console.log({ steps: [...iterable] });
})();
