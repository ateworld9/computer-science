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

function has(arr) {
  const result = [];
  const set = new Set();

  for (let i = 0; i < arr.length; i++) {
    if (set.has(arr[i])) {
      result.push('YES');
    } else {
      set.add(arr[i]);
      result.push('NO');
    }
  }

  return result.join('\n');
}

async function main() {
  const str = await read();
  // str = str.slice(0, -1)
  // parse file string
  const arr = str.split(' ');
  console.log('>>>', arr.length, arr[100000].length);
  // problem with split, last element is ''
  const result = has(arr);

  try {
    await fs.writeFile('output.txt', result);
  } catch (err) {
    console.error(err.message);
  }
}

main();
