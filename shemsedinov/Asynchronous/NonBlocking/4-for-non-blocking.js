'use strict';

const range = {
	start: 1,
	end: 10000,
	[Symbol.asyncIterator]() {
		let value = this.start;
		return {
			next: () =>
				new Promise((resolve) => {
					setTimeout(() => {
						resolve({ value, done: value++ == this.end + 1 });
					}, 0);
				}),
		};
	},
};

console.dir({
	range,
	names: Object.getOwnPropertyNames(range),
	symbols: Object.getOwnPropertySymbols(range),
});

setTimeout(() => {
	console.log('setTimeout 0');
}, 0);

(async () => {
	const begin = process.hrtime.bigint();
	for await (const number of range) {
		console.log(number);
	}

	const diff = (process.hrtime.bigint() - begin) / 1_000_000n;
	console.log('Time(ms): ', diff.toString());
})();
