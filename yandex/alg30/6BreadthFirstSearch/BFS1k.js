/* eslint-disable no-continue */
/* eslint-disable no-loop-func */
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

function bfs1k(graph, k, source) {
  const distances = new Array(graph.length).fill(Infinity);
  distances[source] = 0;
  const visited = [];
  const queues = new Array(k + 1).fill(0);
  queues.forEach((el, i) => {
    queues[i] = [];
  });
  queues[0].push(source);

  let countInQueues = 1;
  let currentQueue = 0;

  while (countInQueues > 0) {
    while (queues[currentQueue % (k + 1)].length === 0) {
      currentQueue += 1;
    }
    const current = queues[currentQueue % (k + 1)].shift();
    console.log(current);
    countInQueues -= 1;
    if (visited[current]) {
      continue;
    }
    graph[current].forEach(([next, weight]) => {
      if (distances[next] > distances[current] + weight) {
        distances[next] = distances[current] + weight;
        queues[current % (k + 1)].push(next);
        countInQueues += 1;
      }
    });

    visited[current] = true;
  }
  return distances;
}

async function main() {
  let str = await read();

  str = str.slice(0, -1);
  const lines = str.split('\n');
  const [verticiesCount, edgesCount] = lines[0].split(' ').map(Number);
  const graph = [];
  let i = 0;
  let k = 1;

  while (i <= verticiesCount) {
    graph[i] = [];
    i += 1;
  }

  for (let ii = 1; ii <= edgesCount; ii += 1) {
    const [a, b, len] = lines[ii].split(' ').map(Number);
    graph[a - 1].push([b - 1, len]);
    graph[b - 1].push([a - 1, len]);
    k = Math.max(len, k);
  }
  console.table(graph);

  const dist = bfs1k(graph, k, 0);
  console.table(dist);
  dist.shift();
  try {
    await fs.writeFile(
      'output.txt',
      dist.map((el) => (el === Infinity ? 'Impossible' : el)).join(' '),
    );
  } catch (err) {
    console.error(err.message);
  }
}

main();
