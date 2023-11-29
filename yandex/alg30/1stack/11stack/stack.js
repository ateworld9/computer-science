const Node = class {
  constructor(nodeData) {
    this.data = nodeData;
    this.next = null;
  }
};

export const Stack = class {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(data) {
    const node = new Node(data);
    node.next = this.head;
    this.head = node;
    if (this.tail === null) this.tail = node;

    this.length += 1;
    return "ok";
  }

  pop() {
    const res = this.head.data ?? null;
    this.head = this.head.next ?? null;
    this.length -= 1;
    return res;
  }

  back() {
    return this.head.data;
  }

  size() {
    return this.length;
  }

  clear() {
    this.head = null;
    return "ok";
  }

  exit() {
    return "bye";
  }
};
