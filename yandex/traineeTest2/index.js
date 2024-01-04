let head = null;
let tail = null;
let minVal = Infinity;
let maxVal = 0;
const queue = {
	push(nodeData) {
		const node = {
			data: nodeData,
			next: null,
		};
		if (nodeData < minVal) minVal = nodeData;

		if (nodeData > maxVal) maxVal = nodeData;

		if (head == null) head = node;
		else tail.next = node;
		tail = node;
	},
	shift() {
		const data = head?.data;
		head = head?.next ?? null;

		if (data === minVal) {
			let iterator = head;
			minVal = iterator?.data;

			while (iterator?.next) {
				if (iterator?.next?.data < minVal) minVal = iterator?.next?.data;
				iterator = iterator?.next;
			}
		}
		if (data === maxVal) {
			let iterator = head;
			maxVal = iterator?.data ?? 0;
			while (iterator?.next) {
				if (iterator?.next?.data > maxVal) maxVal = iterator?.next?.data;
				iterator = iterator?.next;
			}
		}

		return data;
	},
	min() {
		return minVal === Infinity ? 0 : minVal;
	},
	max() {
		return maxVal;
	},
	print() {
		let Head = head;
		console.log(Head?.data);
		while (Head?.next) {
			Head = Head.next;
			console.log(Head?.data);
		}
	},
};

console.log(queue.min(), queue.max());
queue.push(10);
queue.push(2);
queue.push(3);
queue.push(4);
queue.push(5);
queue.push(1);
queue.print();
queue.shift();
queue.print();
console.log(queue.min(), queue.max());
