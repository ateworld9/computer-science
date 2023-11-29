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
async function main() {
  let a = await read('input.txt');
  let b = await read('out/02.a');

  a = a.split('\n');
  b = b.split('\n');

  // const result = [];

  a.forEach((line, i) => {
    if (b[i] === 'NO') {
      console.log('-----------');
      console.log(i);
      console.log(a[i]);
      console.log(b[i]);
      console.log('-----------');
    }
  });
}
main();
