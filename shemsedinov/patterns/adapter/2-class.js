// 'use strict'

class ArrayToQueueAdapter extends Array {
	enqueue(data) {
		this.push(data);
	}

	dequeue() {
		return this.pop();
	}

	get count() {
		return this.length;
	}
}

// Usage

const queue = new ArrayToQueueAdapter();
queue.enqueue('one');
queue.enqueue('two');
queue.enqueue('three');

while (queue.count) {
	console.log(queue.dequeue());
}
