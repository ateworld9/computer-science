/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
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

function makeAdjaencyList(edges, vertexCount) {
  const adjaencyList = new Array(vertexCount + 1);
  edges.forEach(([a, b]) => {
    if (adjaencyList[a] === undefined) {
      adjaencyList[a] = b === undefined ? [] : [b];
    } else {
      adjaencyList[a].push(b);
    }
    if (b !== undefined) {
      if (adjaencyList[b] === undefined) {
        adjaencyList[b] = [a];
      } else {
        adjaencyList[b].push(a);
      }
    }
  });

  for (let i = 1; i <= vertexCount; i += 1) {
    if (adjaencyList[i] === undefined) {
      adjaencyList[i] = [];
    }
  }

  return adjaencyList;
}
function invertColor(color) {
  return color === 1 ? 2 : 1;
}

function doDFS(graph, vertexCount) {
  const visited = new Array(vertexCount);

  function DFS(vertex, color) {
    visited[vertex] = color;
    for (let i = 0; i < graph[vertex].length; i += 1) {
      if (visited[graph[vertex][i]] === color) {
        return false;
      }
      if (visited[graph[vertex][i]] === undefined) {
        const result = DFS(graph[vertex][i], invertColor(color));
        if (result === false) {
          return false;
        }
      }
    }
  }

  for (let i = 1; i < graph.length; i += 1) {
    if (visited[i] === undefined) {
      const result = DFS(i, 1);
      if (result === false) {
        return false;
      }
    }
  }

  return true;
}

async function main() {
  let str = await read();

  str = str.slice(0, -1);
  // parse file string

  let lines = str.split('\n').map((el) => el.split(' ').map(Number));

  const [n, m] = lines[0];
  if (m > 1) {
    lines = lines.slice(1, m + 1);
  } else {
    lines = lines.slice(1);
  }

  const graph = makeAdjaencyList(lines, n);
  // console.table(graph);
  const visited = doDFS(graph, n);
  // console.log(visited);

  try {
    await fs.writeFile('output.txt', visited ? 'YES' : 'NO');
  } catch (err) {
    console.error(err.message);
  }
}

main();
