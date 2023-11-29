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

function BFS(graph, source) {
  const distance = [];
  distance[source] = 0;
  const queue = [];
  queue.push(source);
  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (currentNode == 0) {
      break;
    }
    // for tuples
    graph[currentNode].forEach((neighbour) => {
      // const nextNode = neighbour[0];
      // const newRoadLength = distance[currentNode] + neighbour[1];
      if (distance[neighbour[0]] === undefined) {
        distance[neighbour[0]] = distance[currentNode] + neighbour[1];
        queue.push(neighbour[0]);
      }
    });
  }

  return distance;
}

function findNearestVertex(distances, visited) {
  let minDistance = Infinity;
  let nearestVertex = -1;

  distances.forEach((distance, vertex) => {
    if (!visited[vertex] && distance < minDistance) {
      minDistance = distance;
      nearestVertex = vertex;
    }
  });
  return nearestVertex;
}

function handleVertex(graph, distances, visited, previous, from) {
  graph[from].forEach((el, i) => {
    // const [to, time] = el;
    const newDist = distances[from] + el;
    if (newDist < distances[i]) {
      distances[i] = newDist;
      previous[i] = from;
    }
  });
  visited[from] = 1;
}

function dijkstra(graph, vertexCount, start) {
  const visited = [];
  const distances = new Array(vertexCount).fill(Infinity);
  const previous = [];
  previous[start] = -1;
  distances[start] = 0;
  let last = null;

  let activeVertex = findNearestVertex(distances, visited);
  while (activeVertex !== -1) {
    handleVertex(graph, distances, visited, previous, activeVertex);
    last = activeVertex;
    activeVertex = findNearestVertex(distances, visited);
  }

  const way = [];
  let lastNode = last;
  while (lastNode !== -1) {
    way.push(+lastNode + 1);
    lastNode = previous[lastNode];
  }

  return `${distances[last].toFixed(10)}\n${way.join(" ")}`;
}

async function main() {
  const str = await read();

  const lines = str.split("\n");
  const citiesCount = Number(lines[0]);

  const delays = [];
  const speeds = [];
  const graph = [];
  const graph2 = [];

  for (let i = 0; i < citiesCount; i += 1) {
    const [delay, speed] = lines[i + 1].split(" "); // [delay, speed]
    delays[i] = +delay;
    speeds[i] = +speed;
    graph[i] = [];
    graph2[i] = [];
  }
  for (let i = 0; i < citiesCount - 1; i += 1) {
    const [a, b, dist] = lines[i + 1 + citiesCount].split(" ").map(Number);
    // as tuples: indexFrom: neighboursArray: [indexTo, distance]
    graph[a - 1].push([b - 1, dist]);
    graph[b - 1].push([a - 1, dist]);
  }

  // console.log('cities(delay, speed): ', cities);
  // console.log('graph for bfs: ', graph);

  // console.time('bfs');
  for (let city = 1; city < citiesCount; city += 1) {
    const distances = BFS(graph, city);
    // console.log('bfs', city, distances);
    distances.forEach((distance, i) => {
      if (i !== city && distance !== Infinity) {
        graph2[i][city] = distance / speeds[city] + delays[city];
      }
    });
  }
  // console.timeEnd('bfs');

  // console.log('graph for dijkstra: ', graph2);

  // console.time('dijkstra');
  const res = dijkstra(graph2, citiesCount, 0);
  // console.timeEnd('dijkstra');
  // console.log(res);

  // const mem = process.memoryUsage();
  // const tomb = 1024 ** 2;
  // for (el in mem) {
  //   console.log(el, mem[el] / tomb);
  // }
  try {
    await fs.writeFile("output.txt", res);
    // await fs.writeFile('output.txt', dijkstra(graph2, citiesCount, 0));
  } catch (err) {
    console.error(err.message);
  }
}

main();
