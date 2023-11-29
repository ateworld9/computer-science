const fs = require('fs/promises');
const path = require('path');

async function read() {
  try {
    return await fs.readFile(path.join(path.resolve(), 'input.txt'), {
      encoding: 'utf8',
    });
  } catch (err) {
    console.error(err.message);
  }
}

function maxCount(arr) {
  let max = 0;
  let count = 0;
  arr.forEach((el) => {
    if (el === max) count++;
    if (el > max) {
      max = el;
      count = 1;
    }
  });
  return count;
}

async function main() {
  let str = await read();
  str = str.slice(0, -1);
  // parse file string
  const arr = str.split('\n0')[0].split('\n').map(Number);
  const result = maxCount(arr);

  try {
    await fs.writeFile('output.txt', result.toString());
  } catch (err) {
    console.error(err.message);
  }
}

main();
