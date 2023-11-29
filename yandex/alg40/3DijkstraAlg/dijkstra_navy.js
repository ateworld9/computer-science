function findNearestVertex(distances, visited) {
  let minDistance = Infinity;
  let nearestVertex = null;

  Object.keys(distances).forEach((vertex) => {
    if (!visited[vertex] && distances[vertex] < minDistance) {
      minDistance = distances[vertex];
      nearestVertex = vertex;
    }
  });

  return nearestVertex;
}
function dijkstra(graph, startVertex) {
  const visited = [];
  const distances = {}; // кратчайшие пути
  const previous = []; // предыдущие вершины

  const verticies = Object.keys(graph);
  verticies.forEach((vertex) => {
    distances[vertex] = Infinity; // поумолчанию все расстояния бесконечны
    previous[vertex] = null;
  });

  distances[startVertex] = 0;

  function handleVertex(vertex) {
    // расстояние до вершины
    const activeVertexDistance = distances[vertex];
    const neighbours = graph[vertex];
    // для всех смежных вершин пересчитать расстояния
    Object.keys(neighbours).forEach((neighbourVertex) => {
      const currentNeighbourDistance = distances[neighbourVertex];
      const newNeighbourDistance =
        activeVertexDistance + neighbours[neighbourVertex];
      if (newNeighbourDistance < currentNeighbourDistance) {
        distances[neighbourVertex] = newNeighbourDistance;
        previous[neighbourVertex] = vertex;
      }
    });

    visited[vertex] = 1;
  }

  // ищем самую близкую вершину из необработанных
  let activeVertex = findNearestVertex(distances, visited);
  // продолжаем цикл, пока остаются необработанные вершины
  while (activeVertex) {
    handleVertex(activeVertex);
    activeVertex = findNearestVertex(distances, visited);
  }

  return distances;
  // return { distances, previous };
}

const graph = {
  a: { b: 2, c: 1 },
  b: { f: 7 },
  c: { d: 5, e: 2 },
  d: { f: 2 },
  e: { f: 1 },
  f: { g: 1 },
  g: {},
};

console.log(dijkstra(graph, "a"));
