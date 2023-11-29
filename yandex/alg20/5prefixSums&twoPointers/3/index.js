const fs = require('fs/promises');
const path = require('path');

async function read(filename = 'input.txt') {
  try {
    return await fs.readFile(path.join(path.resolve(), filename), {
      encoding: 'utf8',
    });
  } catch (err) {
    console.error(err.message);
  }
}

async function main() {
  let str = await read();
  str = str.slice(0, -1);
  const arr = str.split('\n');
  const groups = arr[1]
    .trim()
    .split(' ')
    .map((el, i) => [+el, i + 1])
    .sort((a, b) => a[0] - b[0]);
  const audiences = arr[2]
    .trim()
    .split(' ')
    .map((el, i) => [+el, i + 1])
    .sort((a, b) => a[0] - b[0]);
  let audNum = 0;

  const answer = new Array(groups.length + 1).fill(0);
  let counter = 0;
  for (let i = 0; i < groups.length; i++) {
    const [pupils, groupNum] = groups[i];

    while (audNum < audiences.length && audiences[audNum][0] < pupils + 1)
      audNum += 1;
    if (audNum === audiences.length) break;
    answer[groupNum] = audiences[audNum][1];
    counter += 1;
    audNum += 1;
  }

  try {
    await fs.writeFile(
      'output.txt',
      `${counter}\n${answer.slice(1).join(' ')}`,
    );
  } catch (err) {
    console.error(err.message);
  }
}

main();
