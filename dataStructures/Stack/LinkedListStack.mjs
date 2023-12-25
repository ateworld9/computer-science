const Node = class {
  constructor(nodeData) {
    this.data = nodeData;
    this.next = null;
  }
};

//  Last In / First Out

// Dynamic Memory Allocation.
// In this method, a linked list is used to implement the stack.

export class Stack {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(data) {
    // append node to head
    const node = new Node(data);
    node.next = this.head;
    this.head = node;
    if (this.tail === null) {
      this.tail = node;
    }

    this.length += 1;
  }

  pop() {
    // delete node to from head
    const node = this.head;
    this.head = this.head.next ?? null;
    this.length -= 1;
    return node.data;
  }

  back() {
    return this.head.data;
  }

  size() {
    return this.length;
  }

  clear() {
    this.head = null;
    return 'ok';
  }

  exit() {
    console.log('bye');
    process.exit();
  }
}
