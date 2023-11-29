const fs = require('node:fs/promises');
const path = require('node:path');

async function read(filename = 'input.txt') {
  try {
    return await fs.readFile(path.join(path.resolve(), filename), {
      encoding: 'utf8',
    });
  } catch (err) {
    console.error(err.message);
    return -1;
  }
}

function solver(a, b, n) {
  if (a > Math.ceil(b / n)) {
    return 'Yes';
  }
  return 'No';
}

async function main() {
  let str = await read();

  str = str.slice(0, -1);
  // parse file string

  const [a, b, n] = str.split('\n').map(Number);
  const result = solver(a, b, n);
  try {
    await fs.writeFile('output.txt', result);
  } catch (err) {
    console.error(err.message);
  }
}

main();
