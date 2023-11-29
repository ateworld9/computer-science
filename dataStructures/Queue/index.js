/* eslint-disable max-classes-per-file */
const Node = class {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
};

//  First in / First out

const Queue = class {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  print() {
    let { head } = this;
    const result = [head.data];

    while (head.next) {
      head = head.next;
      result.push(head.data);
    }
    console.log(result);
  }

  enqueue(data) {
    // append node to tail
    const node = new Node(data);
    if (this.head == null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
    this.length += 1;
  }

  dequeue() {
    // delete node to from head
    this.head = this.head.next ?? null;
    this.length -= 1;
  }

  isEmpty() {
    return this.length === 0;
  }
};

export { Queue };
