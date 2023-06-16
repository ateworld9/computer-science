const Node = class {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

//  First in / First out

const Queue = class {
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
      result.push(head.data)
    }
    console.log(result)
  }

  enqueue(data) {
    // append node to tail
    const node = new Node(data)
    if (this.head == null)
      this.head = node

    else
      this.tail.next = node

    this.tail = node
    this.length += 1
  }

  dequeue() {
    // delete node to from head
    this.head = this.head.next ?? null
    this.length -= 1
  }
}

const queue = new Queue()

queue.enqueue(1)
queue.print()
queue.enqueue(2)
queue.print()
queue.enqueue(3)
queue.print()
queue.enqueue(4)
queue.print()
queue.dequeue()
queue.print()
