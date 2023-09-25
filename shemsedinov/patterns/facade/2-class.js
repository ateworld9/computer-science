// 'use strict'

class TimeoutCollection {
	constructor(timeout) {
		this.timeout = timeout
		this.collection = new Map()
		this.timers = new Map()
	}

	set(key, value) {
		const timer = this.timers.get(key)
		if (timer) clearTimeout(timer)
		const timeout = setTimeout(() => {
			this.delete(key)
		}, this.timeout)
		timeout.unref()
		this.collection.set(key, value)
		this.timers.set(key, timeout)
	}

	get(key) {
		return this.collection.get(key)
	}

	delete(key) {
		const timer = this.timers.get(key)
		if (timer) {
			clearTimeout(timer)
			this.collection.delete(key)
			this.timers.delete(key)
		}
	}

	toArray() {
		return [...this.collection.entries()]
	}
}

// Usage

const hash = new TimeoutCollection(1000)
hash.set('one', 1)
console.dir({ array: hash.toArray() })

hash.set('two', 2)
console.dir({ array: hash.toArray() })

setTimeout(() => {
	hash.set('three', 3)
	console.dir({ array: hash.toArray() })

	setTimeout(() => {
		hash.set('four', 4)
		console.dir({ array: hash.toArray() })
	}, 500)
}, 1500)
