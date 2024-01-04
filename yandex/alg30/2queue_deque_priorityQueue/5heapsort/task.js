const readline = require('node:readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const maxComparator = (a, b) => b - a;
const minComparator = (a, b) => a - b;

function siftDown(heap, i = 0, heapsize, comparator = minComparator) {
	while (2 * i + 1 < heapsize) {
		const left = 2 * i + 1;
		const right = 2 * i + 2;
		let lowestSon = left;
		if (right < heapsize && comparator(heap[right], heap[left]) > 0) {
			lowestSon = right;
		}
		if (comparator(heap[i], heap[lowestSon]) >= 0) {
			break;
		}
		// swap(heap, i, lowestSon);
		[heap[i], heap[lowestSon]] = [heap[lowestSon], heap[i]];
		i = lowestSon;
	}
}

function buildHeap(arr, comparator = minComparator) {
	for (let i = Math.floor(arr.length / 2); i >= 0; i -= 1) {
		siftDown(arr, i, arr.length, comparator);
	}
}

function heapsort(arr, comparator = minComparator) {
	buildHeap(arr, comparator);
	let heapSize = arr.length;
	for (let i = 0; i < arr.length; i += 1) {
		[arr[0], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[0]];
		heapSize -= 1;
		siftDown(arr, 0, heapSize, comparator);
	}
}
rl.once('line', () => {
	rl.on('line', (line) => {
		const arr = line.trim().split(' ').map(Number);
		heapsort(arr);
		// console.log(arr.slice().sort(minComparator).join(' '));
		console.log(arr.join(' '));
		process.exit(0);
	});
});
