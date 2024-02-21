// visualisation https://www.cs.usfca.edu/~galles/visualization/Heap.html
class Heap {
	constructor(comparator) {
		this.arr = [];
		this.comparator = comparator;
	}

	isCorrectOrder(first, second) {
		return this.comparator(first, second) < 0;
	}

	getLeftChildIndex(parentIndex) {
		return 2 * parentIndex + 1;
	}

	getRightChildIndex(parentIndex) {
		return 2 * parentIndex + 2;
	}

	getParentIndex(childIndex) {
		return Math.floor((childIndex - 1) / 2);
	}

	leftChild(parentIndex) {
		return this.arr[this.getLeftChildIndex(parentIndex)];
	}

	rightChild(parentIndex) {
		return this.arr[this.getRightChildIndex(parentIndex)];
	}

	parent(childIndex) {
		return this.arr[this.getParentIndex(childIndex)];
	}

	hasParent(childIndex) {
		return this.getParentIndex(childIndex) >= 0;
	}

	hasLeftChild(parentIndex) {
		return this.getLeftChildIndex(parentIndex) < this.arr.length;
	}

	hasRightChild(parentIndex) {
		return this.getRightChildIndex(parentIndex) < this.arr.length;
	}

	isEmpty() {
		return !this.arr.length;
	}

	swap(indexOne, indexTwo) {
		const tmp = this.arr[indexTwo];
		this.arr[indexTwo] = this.arr[indexOne];
		this.arr[indexOne] = tmp;
	}

	push(item) {
		this.arr.push(item);
		this.heapifyUp();
		return this;
	}

	heapifyUp(startIndex) {
		let currentIndex = startIndex || this.arr.length - 1;

		while (
			this.hasParent(currentIndex) &&
			!this.isCorrectOrder(this.parent(currentIndex), this.arr[currentIndex])
		) {
			const parentIndex = this.getParentIndex(currentIndex);
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
			return this.arr.pop();
		}

		const item = this.arr[0];

		this.arr[0] = this.arr.pop();
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
				nextIndex = this.getRightChildIndex(currentIndex);
			} else {
				nextIndex = this.getLeftChildIndex(currentIndex);
			}

			if (this.isCorrectOrder(this.arr[currentIndex], this.arr[nextIndex])) {
				break;
			}

			this.swap(currentIndex, nextIndex);
			currentIndex = nextIndex;
		}
	}
}
