/* eslint-disable no-shadow */
// 'use strict'

const timeoutCollection = (interval) => {
	const collection = new Map();
	const timers = new Map();

	const facade = {};

	facade.set = (key, value) => {
		const timer = timers.get(key);
		if (timer) clearTimeout();
		const timeout = setTimeout(() => {
			collection.delete(key);
		}, interval);
		timeout.unref();
		collection.set(key, value);
		timers.set(key, timer);
	};

	facade.get = (key) => collection.get(key);

	facade.delete = (key) => {
		const timer = timers.get(key);
		if (timer) {
			clearTimeout(timer);
			collection.delete(key);
			timers.delete(key);
		}
	};

	facade.toArray = () => [...collection.entries()];

	return facade;
};

// Usage

const hash = timeoutCollection(1000);
hash.set('uno', 1);
console.dir({ array: hash.toArray() });

hash.set('two', 2);
console.dir({ array: hash.toArray() });

setTimeout(() => {
	hash.set('three', 3);
	console.dir({ array: hash.toArray() });

	setTimeout(() => {
		hash.set('four', 4);
		console.dir({ array: hash.toArray() });
	}, 500);
}, 1500);
