// 'use strict'

const SingletonHard = new (function () {
	const single = this;
	return function () {
		return single;
	};
})();

const Singleton = (() => {
	let instance;
	// eslint-disable-next-line no-shadow
	function Singleton(params) {
		if (instance) return instance;
		instance = this;
	}

	Singleton.prototype.test = function () {}; // for example

	return Singleton;
})();

// Usage
// eslint-disable-next-line no-self-compare
console.assert(new Singleton() === new Singleton());
console.log('instances are equal');
