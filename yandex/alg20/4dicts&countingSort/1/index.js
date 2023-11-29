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

function sameKeySums(pairs) {
  const map = new Map();
  pairs.forEach((pair) => {
    if (map.has(pair[0])) map.set(pair[0], map.get(pair[0]) + pair[1]);
    else map.set(pair[0], pair[1]);
  });
  const tuples = [...map.entries()].sort((a, b) => {
    if (a[0] < b[0]) return -1;
    else return 1;
  });
  for (let i = 0; i < tuples.length; i++)
    tuples[i] = `${tuples[i][0].toString()} ${tuples[i][1].toString()}`;

  return tuples.join('\n');
}

async function main() {
  let str = await read();
  str = str.slice(0, -1);

  const arrs = str
    .split('\n')
    .slice(1)
    .map((el) => el.split(' ').map(BigInt));
  const result = sameKeySums(arrs);

  try {
    await fs.writeFile('output.txt', result);
  } catch (err) {
    console.error(err.message);
  }
}

main();
