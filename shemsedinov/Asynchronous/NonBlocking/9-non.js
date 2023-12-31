'use strict';

class AsyncArray extends Array {
	[Symbol.asyncIterator]() {
		let i = 0;
		return {
			next: () =>
				new Promise((resolve) => {
					setTimeout(
						() =>
							resolve({
								value: this[i],
								done: i++ === this.length,
							}),
						0,
					);
				}),
		};
	}
}

// Usage

let k = 0;

const timer = setInterval(() => k++, 10);

(async () => {
	const numbers = new AsyncArray(1000).fill(1);
	let i = 0;
	for await (const number of numbers) {
		if (number) i++;
	}
	clearInterval(timer);
	console.dir({ i, k });
})();
