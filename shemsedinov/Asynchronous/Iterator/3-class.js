class Counter {
	constructor(begin, end, step = 1) {
		this.begin = begin;
		this.end = end;
		this.step = step;
	}

	[Symbol.iterator]() {
		const end = this.end;
		let i = this.begin;
		const iterator = {
			next() {
				return {
					value: i++,
					done: i > end,
				};
			},
		};
		return iterator;
	}
}

// Usage

const iterable = new Counter(0, 3);
const iterator = iterable[Symbol.iterator]();

const step1 = iterator.next();
const step2 = iterator.next();
const step3 = iterator.next();
const step4 = iterator.next(); // should not be displayed, (its done)
console.log({ step1, step2, step3, step4 });

{
	for (const step of iterable) {
		console.log({ step });
	}
}
