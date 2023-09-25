class ArrayToQueueAdapter {
	constructor(arr = []) {
		this.array = arr
	}

	enqueue(data) {
		this.array.push(data)
	}

	dequeue() {
		return this.array.pop()
	}

	get count() {
		return this.array.length
	}
}

// Usage
const queue = new ArrayToQueueAdapter([1, 2, 3])
queue.enqueue('one')
queue.enqueue('two')
queue.enqueue('three')

while (queue.count) {
	console.log(queue.dequeue())
}
