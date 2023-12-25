const readline = require('readline');

const doDFS1 = function (graph) {
  const visited = [];
  const component = 1;

  const DFSIterable = function (vertex) {
    const stack = [];
    stack.push(vertex);
    while (stack.length !== 0) {
      vertex = stack.pop();
      visited[vertex] = vertex + 1;
      if (visited[vertex] === undefined) {
        graph[vertex].forEach((el) => {
          stack.push(el);
        });
      }
    }
  };
  DFSIterable(0);
  return visited;
};

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
let lines = [];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on('line', (line) => {
  lines.push(line.split(' ').map(Number));
});
rl.on('close', () => {
  const [n, m] = lines[0];
  if (m > 1) {
    lines = lines.slice(1, m + 1);
  } else {
    lines = lines.slice(1);
  }
  const graph = makeAdjaencyList(lines, n);
  // console.log(graph);
  const visited = doDFS(graph, n);
  // console.log(visited, visited.length);

  const result = [];
  for (let i = 1; i < visited.length; i += 1) {
    if (visited[i] === 1) {
      result.push(i);
    }
  }
  console.log(`${result.length}\n${result.join(' ')}`);
});
