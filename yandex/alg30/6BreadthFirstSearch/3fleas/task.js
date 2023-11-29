const { createInterface } = require('readline');

function BFS(graph, x, y, N, M) {
  const distances = [];
  for (let i = 0; i < N; i++) {
    distances[i] = [];
  }
  distances[x][y] = 0;

  const queue = [];
}

const lines = [];
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on('line', (line) => {
  lines.push(line.toString().trim());
});
rl.on('close', () => {
  console.log(lines);
  const [N, M, x, y, fleasCount] = lines[0].split(' ').map(Number);
  const graph = new Array(N);
  for (let i = 0; i < N; i++) {
    graph[i] = {};
  }
  for (let i = 0; i < fleasCount; i += 1) {
    const [x, y] = lines[i + 1].split(' ').map(Number);
    console.log(x, y);

    graph[x - 1][y - 1] = true;
  }

  console.log(graph, x, y, N, M);
  BFS(graph, x, y, N, M);
});
