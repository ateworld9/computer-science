const fs = require('node:fs/promises');
const path = require('node:path');

async function read() {
  try {
    return await fs.readFile(path.join(path.resolve(), 'input.txt'), {
      encoding: 'utf8',
    });
  } catch (err) {
    console.error(err.message);
  }
}

const Node = class {
  constructor(nodeData) {
    this.data = nodeData;
    this.next = null;
  }
};

const Stack = class {
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
    return 'ok';
  }

  pop() {
    if (this.head === null) return 'error';

    const res = this.head.data ?? null;
    this.head = this.head.next ?? null;
    this.length -= 1;
    return res;
  }

  back() {
    return this.head?.data ?? 'error';
  }

  size() {
    return this.length;
  }

  clear() {
    this.head = null;
    this.length = 0;
    return 'ok';
  }

  exit() {
    return 'bye';
  }
};

async function main() {
  let data = '';
  const str = await read();

  const stack = new Stack();

  let commandsArr = str.split('\n');
  commandsArr.pop(); // ??
  commandsArr = commandsArr.map((el) => el.split(' '));

  for (let i = 0; i < commandsArr.length; i += 1) {
    data += `${stack[commandsArr[i][0]](commandsArr[i][1])}\n`;
    if (commandsArr[i][0] === 'exit') break;
  }

  try {
    await fs.writeFile('output.txt', data);
  } catch (err) {
    console.error(err.message);
  }
}

main();
