class Counter {
	constructor(begin, end, step = 1) {
		this.begin = begin;
		this.end = end;
		this.step = step;
	}

	[Symbol.asyncIterator]() {
		const end = this.end;
		let i = this.begin;
		const step = this.step;
		const iterator = {
			async next() {
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

{
	const iterable = new Counter(0, 3);
	const iterator = iterable[Symbol.asyncIterator]();

	const step1 = iterator.next();
	const step2 = iterator.next();
	const step3 = iterator.next();
	const step4 = iterator.next(); // should not be displayed, (its done)

	Promise.all([step1, step2, step3, step4]).then((steps) => {
		console.log(steps);
	});
}

{
	(async () => {
		for await (const step of new Counter(0, 3)) {
			console.log({ step });
		}
	})();
}

(async () => {
	// console.log({ steps: [...iterable] });
})();
