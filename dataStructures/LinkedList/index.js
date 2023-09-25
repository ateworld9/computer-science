/* eslint-disable max-classes-per-file */
const LinkedListNode = class {
	constructor(nodeData) {
		this.data = nodeData
		this.next = null
	}
}

const LinkedList = class {
	constructor() {
		this.head = null
		this.tail = null
		this.length = 0
	}

	print() {
		let { head } = this
		const result = []
		if (head?.data) result.push(head.data)

		while (head?.next) {
			head = head.next
			result.push(head.data)
		}
		console.log(result)
	}

	toArray() {
		let { head } = this
		const result = [head.data]
		while (head.next) {
			head = head.next
			result.push(head.data)
		}
		return result
	}

	insertToHead(nodeData) {
		const node = Object.create(LinkedListNode).init(nodeData)
		node.next = this.head
		this.head = node
		if (this.tail === null) { this.tail = node }

		this.length += 1
	}

	insert(nodeData, position) {
		const node = Object.create(LinkedListNode).init(nodeData)
		if (this.head === null && position === 0) {
			this.head = node
			this.tail = node
			this.length = 1
			return
		}
		if (position < 0 || position > this.length) { throw new Error('LinkedList: insert: Invalid position') }

		let pointer = this.head

		for (let i = 0; i < position - 1; i += 1) { pointer = pointer.next }

		if (pointer.next === null) {
			node.next = null
			this.tail = node
		}
		pointer.next = node

		this.length += 1
	}

	insertToTail(nodeData) {
		const node = new LinkedListNode(nodeData)

		if (this.head == null) { this.head = node } else { this.tail.next = node }

		this.tail = node
		this.length += 1
	}

	delete(position) {
		if (position < 0 || position >= this.length) { throw new Error('LinkedList: delete: Invalid position') }

		let pointer = this.head

		if (position === 0) {
			this.head = pointer.next
		} else {
			for (let i = 0; i < position - 1; i += 1) { pointer = pointer.next }

			pointer.next = pointer.next?.next ?? null
		}

		this.length -= 1
	}

	reverse() {
		let prev = null
		let curr = this.head
		let next = null

		while (curr) {
			// Сохраняем следующий узел.
			next = curr.next

			// Меняем ссылку на следующий "next" узел текущего узла,
			// чтобы он ссылался на предыдущий узел.
			// Так как мы меняем их местами, нужно поменять и ссылки на узлы.
			// Изначально, первый узел не имеет предыдущего узла,
			// поэтому после перестановки его "next" станет "null".
			curr.next = prev

			// Текущий узел делаем предыдущим.
			prev = curr

			// Следующий узел становится текущим.
			curr = next
		}

		// Меняем head и tail местами.
		this.tail = this.head

		// В данном случае prev это последний узел,
		// поэтому, после reverse, он становится первым.
		this.head = prev
	}
}
// const list = new LinkedList()

// list.insertToTail(2)
// list.insertToTail(6)
// list.insertToTail(19)
// list.insertToTail(20)
// list.print()
// list.reverse()
// list.print()
module.exports = LinkedList
