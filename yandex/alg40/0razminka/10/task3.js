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

function is(n, a, b) {
  return n % a <= Math.floor(n / a) * (b - a);
}

async function main() {
  let str = await read();

  str = str.slice(0, -1);
  let arr = str.split('\n').slice(1);
  arr = arr.map((el) => el.split(' ').map(Number));
  const result = [];

  arr.forEach((el) => {
    const [n, a, b] = el;
    result.push(is(n, a, b) ? 'YES' : 'NO');
  });

  try {
    await fs.writeFile('output.txt', result.join('\n'));
  } catch (err) {
    console.error(err.message);
  }
}

main();
