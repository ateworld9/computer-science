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

function makeAdjaencyList(matrix, vertexCount) {
  const adjaencyList = new Array(vertexCount + 1);

  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1) {
      if (matrix[i][j] === 1) {
        if (adjaencyList[i + 1] === undefined) {
          adjaencyList[i + 1] = [j + 1];
        } else {
          adjaencyList[i + 1].push(j + 1);
        }
      }
    }
  }

  for (let i = 1; i <= vertexCount; i += 1) {
    if (adjaencyList[i] === undefined) {
      adjaencyList[i] = [];
    }
  }

  return adjaencyList;
}

function BFS(adjaencyList, vertexCount, source, destination, resultPath) {
  const distance = new Array(vertexCount + 1).fill(Infinity);
  const path2 = new Array(vertexCount + 1);
  distance[source] = 0;
  path2[0] = source;
  const queue = [];
  queue.push(source);
  while (queue.length > 0) {
    const node = queue.shift();

    adjaencyList[node].forEach((childNode, i) => {
      if (distance[childNode] === Infinity) {
        distance[childNode] = distance[node] + 1;
        if (path2[distance[node] + 1] === undefined) {
          path2[distance[node] + 1] = [childNode];
        } else {
          path2[distance[node] + 1].push(childNode);
        }
        queue.push(childNode);
      }
    });
  }

  // console.log(distance);
  if (distance[destination] === Infinity) {
    return -1;
  }

  resultPath.push(destination);
  let dist = distance[destination];
  let node = destination;
  // console.log(resultPath);
  while (dist > 0) {
    for (let i = 0; i < adjaencyList[node].length; i += 1) {
      if (distance[adjaencyList[node][i]] === dist - 1) {
        resultPath.push(adjaencyList[node][i]);
        node = adjaencyList[node][i];
        dist -= 1;
        break;
      }
    }
  }

  return distance[destination];
}

async function main() {
  let str = await read();

  str = str.slice(0, -1);
  // parse file string

  const lines = str.split('\n').map((el) => el.split(' ').map(Number));
  // console.table(lines);
  const vertexCount = Number(lines[0]);
  const [source, destination] = lines.at(-1).map(Number);

  // lines.pop();
  // console.table(lines);
  const matrix = lines.slice(1, vertexCount + 1);
  // console.table(matrix);
  const graph = makeAdjaencyList(matrix, vertexCount);
  // console.table(graph);
  const resultPath = [];
  const result = BFS(graph, vertexCount, source, destination, resultPath);
  // console.log(result);
  try {
    await fs.writeFile(
      'output.txt',
      resultPath.length <= 1
        ? `${result}`
        : `${result}\n${resultPath.reverse().join(' ')}`,
    );
  } catch (err) {
    console.error(err.message);
  }
}

main();
