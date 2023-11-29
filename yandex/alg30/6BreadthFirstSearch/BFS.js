const fs = require("node:fs/promises");
const path = require("node:path");

async function read(filename = "input.txt") {
  try {
    return await fs.readFile(path.join(path.resolve(), filename), {
      encoding: "utf8",
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

function BFS(adjaencyList, vertexCount, source, destination) {
  const distance = new Array(vertexCount + 1).fill(Infinity);
  distance[source] = 0;
  const queue = [];
  queue.push(source);
  while (queue.length > 0) {
    const node = queue.pop();

    adjaencyList[node].forEach((childNode) => {
      if (distance[childNode] === Infinity) {
        distance[childNode] = distance[node] + 1;
        queue.push(childNode);
      }
    });
  }
  console.log(distance);

  return distance[destination];
}

async function main() {
  let str = await read();

  str = str.slice(0, -1);
  // parse file string

  let lines = str.split("\n").map((el) => el.split(" ").map(Number));
  // console.table(lines);

  const [n, m] = lines[0];
  if (m > 1) {
    lines = lines.slice(1, m + 1);
  } else {
    lines = lines.slice(1);
  }
  const graph = makeAdjaencyList(lines, n);
  console.table(graph);

  const result = BFS(graph, m, 1, 6);
  console.log(result);

  try {
    await fs.writeFile("output.txt", "");
  } catch (err) {
    console.error(err.message);
  }
}

main();
