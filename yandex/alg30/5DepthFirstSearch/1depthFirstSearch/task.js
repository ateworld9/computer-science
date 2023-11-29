/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
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

function doDFS(graph, vertexCount) {
  const visited = new Array(vertexCount + 1).fill(0);
  let component = 1;

  function DFS(now) {
    visited[now] = component;
    for (let i = 0; i < graph[now].length; i += 1) {
      if (visited[graph[now][i]] === 0) {
        DFS(graph[now][i]);
      }
    }
  }

  for (let i = 1; i < graph.length; i += 1) {
    if (visited[i] === 0) {
      DFS(i);
      component += 1;
    }
  }

  return visited;
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
  console.log(graph);
  const visited = doDFS(graph, n);
  // console.log(visited, visited.length);

  const result = [];
  for (let i = 1; i < visited.length; i += 1) {
    if (visited[i] === 1) {
      result.push(i);
    }
  }

  console.log(result, result.length);
  try {
    await fs.writeFile("output.txt", `${result.length}\n${result.join(" ")}`);
  } catch (err) {
    console.error(err.message);
  }
}

main();
