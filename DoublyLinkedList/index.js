const LinkedListNode = class {
  constructor(nodeData) {
    this.data = nodeData
    this.next = null
    this.prev = null
  }
}

const DoublyLinkedList = class {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  print() {
    let head = this.head
    const result = [head.data]

    while (head.next) {
      head = head.next
      result.push(head)
    }
    console.log(result)
  }

  toArray() {
    let head = this.head
    const result = [head.data]
    while (head.next) {
      head = head.next
      result.push(head.data)
    }
    return result
  }

  insertToHead(nodeData) {
    const node = new LinkedListNode(nodeData)
    node.next = this.head
    this.head = node
    if (this.tail === null)
      this.tail = node

    this.length += 1
  }

  insertToTail(nodeData) {
    const node = new LinkedListNode(nodeData)
    if (this.tail === null) {
      this.head = node
      this.tail = node
      this.length += 1
      return
    }
    this.tail.next = node
    node.prev = this.tail
    this.tail = node
    this.length += 1
  }

  delete(position) {
    if (position < 0 || position >= this.length)
      throw new Error('DoublyLinkedList: delete: Invalid position')

    let pointer = this.head

    if (position === 0) {
      this.head = pointer.next
    }
    else {
      for (let i = 0; i < position - 1; i += 1)
        pointer = pointer.next

      pointer.next.prev = pointer.prev
      pointer.next = pointer.next?.next ?? null
    }

    this.length -= 1
  }
}

const list = new DoublyLinkedList()
list.insertToTail(1)
list.insertToTail(2)
list.insertToTail(3)
list.insertToTail(4)
list.delete(2)
list.print()
// console.log(list.toArray(), list)
