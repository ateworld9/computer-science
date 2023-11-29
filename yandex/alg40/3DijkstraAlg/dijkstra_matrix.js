/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
function dijkstra(graph, vertexCount, start) {
  const visited = [];
  const distances = new Array(vertexCount).fill(Infinity);
  const previous = [];
  previous[start] = -1;
  distances[start] = 0;

  let activeVertex = findNearestVertex(distances, visited);
  while (activeVertex !== -1) {
    handleVertex(graph, distances, visited, previous, activeVertex);
    activeVertex = findNearestVertex(distances, visited);
  }

  return [distances, previous];
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
