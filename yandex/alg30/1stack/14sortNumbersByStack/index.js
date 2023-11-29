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

function sort(arr) {
  const stack = [];
  const sorted = [];

  for (let i = 0; i < arr.length; i++) {
    stack.push(+arr[i]);

    while (+stack[stack.length - 1] === sorted.length + 1)
      sorted.push(stack.pop());
  }

  return stack.length === 0 ? 'YES' : 'NO';
}

async function main() {
  let str = await read();
  str = str.slice(0, -1);
  // parse file string
  const arr = str.split('\n')[1].split(' ');

  const result = sort(arr);

  try {
    await fs.writeFile('output.txt', result.toString());
  } catch (err) {
    console.error(err.message);
  }
}

main();
