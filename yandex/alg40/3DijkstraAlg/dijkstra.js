/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
function dijkstra(graph, start) {
  const visited = [];
  const distances = new Array(graph.length).fill(Infinity);
  const previous = [];
  previous[start] = -1;
  distances[start] = 0;

  let activeVertex = findNearestVertex(distances, visited);
  while (activeVertex !== -1) {
    handleVertex(graph, distances, visited, previous, activeVertex);
    activeVertex = findNearestVertex(distances, visited);
  }

  return distances;
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
  graph[from].forEach(([to, weight]) => {
    // const [to, weight] = graph[from][i];
    const newDist = distances[from] + weight;
    if (newDist < distances[to]) {
      distances[to] = newDist;
      previous[to] = from;
    }
  });
  visited[from] = 1;
}

const graph = [
  /* 0 */ [
    [1, 2],
    [2, 1],
  ],
  /* 1 */ [[5, 7]],
  /* 2 */ [
    [3, 5],
    [4, 2],
  ],
  /* 3 */ [[5, 2]],
  /* 4 */ [[5, 1]],
  /* 5 */ [[6, 1]],
  /* 6 */ [],
];
console.table(dijkstra(graph, 0));
