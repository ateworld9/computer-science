/* eslint-disable max-len */
const fs = require('node:fs/promises');

const path = require('node:path');

async function read(filename = 'input.txt') {
	try {
		return await fs.readFile(path.join(path.resolve(), filename), {
			encoding: 'utf8',
		});
	} catch (err) {
		console.error(err.message);
		return -1;
	}
}

class Heap {
	constructor(comparator) {
		this.arr = [];
		this.map = new Map();
		this.comparator = comparator;
	}

	isCorrectOrder(first, second) {
		return this.comparator(first, second) < 0;
	}

	leftChild(parentIndex) {
		return this.arr[2 * parentIndex + 1];
	}

	rightChild(parentIndex) {
		return this.arr[2 * parentIndex + 2];
	}

	parent(childIndex) {
		return this.arr[Math.floor((childIndex - 1) / 2)];
	}

	hasLeftChild(parentIndex) {
		return 2 * parentIndex + 1 < this.arr.length;
	}

	hasRightChild(parentIndex) {
		return 2 * parentIndex + 2 < this.arr.length;
	}

	isEmpty() {
		return !this.arr.length;
	}

	swap(indexOne, indexTwo) {
		const tmp = this.arr[indexTwo];
		this.arr[indexTwo] = this.arr[indexOne];
		this.arr[indexOne] = tmp;

		this.map.set(this.arr[indexOne], indexOne);
		this.map.set(this.arr[indexTwo], indexTwo);
	}

	push(item) {
		this.arr.push(item);
		this.map.set(item, this.arr.length - 1);
		this.heapifyUp();
		return this;
	}

	heapifyUp(startIndex) {
		let currentIndex = startIndex || this.arr.length - 1;

		while (
			Math.floor((currentIndex - 1) / 2) >= 0 &&
			!this.isCorrectOrder(this.parent(currentIndex), this.arr[currentIndex])
		) {
			const parentIndex = Math.floor((currentIndex - 1) / 2);
			this.swap(currentIndex, parentIndex);
			currentIndex = parentIndex;
		}
	}

	peek() {
		if (this.arr.length === 0) {
			return null;
		}

		return this.arr[0];
	}

	pop() {
		if (this.arr.length === 0) {
			return null;
		}

		if (this.arr.length === 1) {
			this.map.delete(this.arr[0]);
			return this.arr.pop();
		}

		const item = this.arr[0];
		this.map.delete(item);

		this.arr[0] = this.arr.pop();
		this.map.set(this.arr[0], 0);

		this.heapifyDown();

		return item;
	}

	heapifyDown(customStartIndex = 0) {
		let currentIndex = customStartIndex;
		let nextIndex = null;

		while (this.hasLeftChild(currentIndex)) {
			if (
				this.hasRightChild(currentIndex) &&
				this.isCorrectOrder(
					this.rightChild(currentIndex),
					this.leftChild(currentIndex),
				)
			) {
				nextIndex = 2 * currentIndex + 2;
			} else {
				nextIndex = 2 * currentIndex + 1;
			}

			if (this.isCorrectOrder(this.arr[currentIndex], this.arr[nextIndex])) {
				break;
			}

			this.swap(currentIndex, nextIndex);
			currentIndex = nextIndex;
		}
	}
}

function dijkstra(graph, start) {
	const distances = {};
	const heap = new Heap((a, b) => {
		if (a[0] == b[0]) {
			return Number(a[1]) - Number(b[1]);
		}
		return a[0] - b[0];
	});

	const verticies = Object.keys(graph);
	verticies.forEach((vertex) => {
		// console.log(vertex, start);
		if (vertex == start) {
			distances[vertex] = [0, vertex];
			heap.push(distances[vertex]);
		} else {
			distances[vertex] = [Infinity, vertex];
			heap.push(distances[vertex]);
		}
	});

	function handleVertex(vertex) {
		// расстояние до вершины
		const activeVertexDistance = vertex[0];
		const neighbours = graph[vertex[1]];
		// для всех смежных вершин пересчитать расстояния
		Object.keys(neighbours).forEach((neighbourVertex) => {
			const currentNeighbourDistance = distances[neighbourVertex][0];
			const newNeighbourDistance =
				activeVertexDistance + neighbours[neighbourVertex];
			// console.log(currentNeighbourDistance, newNeighbourDistance, '=', activeVertexDistance, neighbours[neighbourVertex]);
			if (newNeighbourDistance < currentNeighbourDistance) {
				distances[neighbourVertex][0] = newNeighbourDistance;
				heap.heapifyUp(heap.map.get(distances[neighbourVertex]));
			}
		});
	}

	// ищем самую близкую вершину из необработанных
	// продолжаем цикл, пока остаются необработанные вершины
	while (!heap.isEmpty()) {
		const vertex = heap.pop();
		handleVertex(vertex);
	}

	return distances;
}

async function main() {
	let str = await read();

	str = str.slice(0, -1);
	const lines = str.split('\n');
	const [verticiesCount, edgesCount] = lines[0].split(' ').map(Number);
	const graph = {};
	let i = 1;
	while (i <= verticiesCount) {
		graph[i] = {};
		i += 1;
	}
	for (let ii = 1; ii <= edgesCount; ii += 1) {
		const [a, b, len] = lines[ii].split(' ').map(Number);
		graph[a][b] = len;
		graph[b][a] = len;
	}

	const [start, last] = lines[edgesCount + 1].split(' ').map(Number);

	const distances = dijkstra(graph, start);

	try {
		await fs.writeFile(
			'output.txt',
			`${distances[last][0] === Infinity ? -1 : distances[last][0]}`,
		);
	} catch (err) {
		console.error(err.message);
	}
}

main();
