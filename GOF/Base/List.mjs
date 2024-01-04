class Item {
	constructor(data) {
		this.data = data;
		this.next = undefined;
	}
}

export class List {
	constructor() {
		this.head = undefined;
	}

	count() {
		if (this.head === undefined) {
			return 0;
		}
		let i = 1;
		let current = this.head;
		while (current !== undefined) {
			i++;
			current = current.next;
		}
		return i;
	}
	get(index) {
		let current = this.head;
		while (index !== 0 && current !== undefined) {
			current = current.next;
			index--;
		}
		return current;
	}
	first() {
		return this.head;
	}
	last() {
		let current = this.head;
		while (current.next !== undefined) {
			current = current.next;
		}
		return current;
	}

	includes(item) {}
	append(data) {
		if (this.head === undefined) {
			this.head = new Item(data);
		}
		let current = this.head;
		while (current.next !== undefined) {
			current = current.next;
		}
		current.next = new Item(data);
	}
	prepend(data) {
		if (this.head === undefined) {
			this.head = new Item(data);
		}
		let next = this.head;
		this.head = new Item(data);
		this.head.next = next;
	}

	remove(item) {}
	removeFirst() {
		if (this.head === undefined) {
			return;
		}
		const result = this.head;
		this.head = result.next;
		return result;
	}
	removeLast() {}
	removeAll() {
		this.head = undefined;
	}

	// Stack Interface
	top() {}
	push = this.append;
	pop = this.removeLast;
}
