/* eslint-disable for-direction */
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
function greedy(n, a, b) {
  console.log(n, a, b);
  if (n === 0 || n % a === 0 || n % b === 0) {
    return true;
  }
  if (b === a) {
    return false;
  }
  if (n < a) {
    return false;
  }

  if (n / b > 0) {
    if (greedy(n % b, a, b - 1)) return true;
  }
  if (n - b > 0) {
    if (greedy(n - b, a, b)) return true;
  }
  if (n - b > 0) {
    if (greedy(n, a, b - 1)) return true;
  }

  return false;
}

async function main() {
  let str = await read();

  str = str.slice(0, -1);
  // parse file string

  let arr = str.split('\n').slice(1);
  arr = arr.map((el) => el.split(' ').map(Number));
  const result = [];

  const [n, a, b] = arr[14];
  result.push(greedy(n, a, b) ? 'YES' : 'NO');

  // arr.forEach((el) => {
  //   const [n, a, b] = el;
  //   result.push(greedy(n, a, b) ? 'YES' : 'NO');
  // });

  try {
    await fs.writeFile('output.txt', result.join('\n'));
  } catch (err) {
    console.error(err.message);
  }
}

main();
