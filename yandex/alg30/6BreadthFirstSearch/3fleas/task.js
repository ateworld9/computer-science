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

const dx = [-2, -2, -1, 1, -1, 1, 2, 2];
const dy = [-1, 1, -2, -2, 2, 2, -1, 1];

function BFS(x, y, N, M) {
  const distances = [];
  for (let i = 0; i < N; i++) {
    distances[i] = new Array(M).fill(Infinity);
  }
  distances[x][y] = 0;

  const queue = [[x, y]];
  while (queue.length > 0) {
    const [curX, curY] = queue.shift();

    for (let i = 0; i < 8; i++) {
      const newX = curX + dx[i];
      const newY = curY + dy[i];
      if (
        newX >= 0 &&
        newY >= 0 &&
        newX < N &&
        newY < M &&
        // distances[newX][newY] > distances[curX][curY] + 1
        distances[newX][newY] === Infinity
      ) {
        distances[newX][newY] = distances[curX][curY] + 1;
        queue.push([newX, newY]);
      }
    }
  }
  return distances;
}

async function main() {
  let str = await read();

  str = str.slice(0, -1);
  // parse file string
  const lines = str.split('\n');

  const [N, M, x, y, fleasCount] = lines[0].split(' ').map(Number);
  const distances = BFS(x - 1, y - 1, N, M);
  // console.table(distances);
  let res = 0;
  for (let i = 0; i < fleasCount; i += 1) {
    const [x, y] = lines[i + 1].split(' ').map(Number);
    if (distances[x - 1][y - 1] === Infinity) {
      res = -1;
      break;
    }
    res += distances[x - 1][y - 1];
  }
  // console.log(res);

  try {
    await fs.writeFile('output.txt', `${res}`);
  } catch (err) {
    console.error(err.message);
  }
}

main();
