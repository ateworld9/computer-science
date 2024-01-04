const Node = class {
	constructor(nodeData) {
		this.data = nodeData;
		this.next = null;
	}
};

const Queue = class {
	constructor() {
		this.head = null;
		this.tail = null;
		this.minVal = Infinity;
		this.maxVal = 0;
	}

	insertNode(nodeData) {
		const node = new Node(nodeData);

		if (nodeData < this.minVal) this.minVal = nodeData;

		if (nodeData > this.maxVal) this.maxVal = nodeData;

		if (this.head == null) this.head = node;
		else this.tail.next = node;
		this.tail = node;
		console.log(this);
	}

	deleteNode() {
		const data = this.head?.data;
		this.head = this.head?.next ?? null;
		return data;
	}

	// min() {
	//   let head = this.head
	//   let minVal = head?.data ?? 0
	//   while (head?.next) {
	//     if (head?.next?.data < minVal)
	//       minVal = head?.next?.data
	//     head = head?.next
	//   }
	//   return minVal
	// }

	// max() {
	//   let head = this.head
	//   let maxVal = head?.data ?? 0
	//   while (head?.next) {
	//     if (head?.next?.data > maxVal)
	//       maxVal = head?.next?.data
	//     head = head?.next
	//   }
	//   return maxVal
	// }
	print() {
		let head = this.head;
		console.log(head?.data);
		while (head?.next) {
			head = head.next;
			console.log(head?.data);
		}
	}
};

const queue = new Queue();

module.exports = {
	push: queue.insertNode,
	shift: queue.deleteNode,
	min() {
		return queue.minVal === Infinity ? 0 : queue.minVal;
	},
	max() {
		return queue.maxVal;
	},
	print: queue.print,
};

// print() {
//   let head = this.head
//   console.log(head?.data)
//   while (head?.next) {
//     head = head.next
//     console.log(head?.data)
//   }
// }
