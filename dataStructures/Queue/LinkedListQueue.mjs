/* eslint-disable max-classes-per-file */
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

//  First in / First out

export class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
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
    const data = this.head.data;
    this.head = this.head.next ?? null;
    this.length -= 1;

    return data;
  }

  isEmpty() {
    return this.length === 0;
  }
}
