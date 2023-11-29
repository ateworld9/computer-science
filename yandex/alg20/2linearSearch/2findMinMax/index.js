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
function findMinMax(arr) {
  const n = arr.length;
  const temp = new Array(n);
  let shop = false;
  for (let i = 0; i < n; i += 1) {
    if (arr[i] === 2) shop = i;
    if (arr[i] === 1 && shop !== false) temp[i] = i - shop;
  }

  shop = false;

  let result = 0;
  for (let i = n - 1; i >= 0; i -= 1) {
    if (arr[i] === 2) shop = i;
    if (arr[i] === 1 && shop !== false) {
      if (temp[i] === undefined || temp[i] > shop - i) temp[i] = shop - i;
    }
  }

  temp.forEach((el) => {
    if (el > result) result = el;
  });
  console.error(result);
  return result;
}

async function main() {
  let str = await read();
  str = str.slice(0, -1);
  // parse file string
  const arr = str.split(' ').map(Number);
  const result = findMinMax(arr);

  try {
    await fs.writeFile('output.txt', result.toString());
  } catch (err) {
    console.error(err.message);
  }
}

main();
