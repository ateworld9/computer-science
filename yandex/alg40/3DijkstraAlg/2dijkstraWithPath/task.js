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

function dijkstra(graph, start) {
  const visited = {};
  const distances = {};
  const previous = {};

  const verticies = Object.keys(graph);
  verticies.forEach((vertex) => {
    distances[vertex] = Infinity;
    previous[vertex] = null;
  });
  distances[start] = 0;

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

  return [distances, previous];
}

async function main() {
  let str = await read();

  str = str.slice(0, -1);
  const lines = str.split('\n');
  const [verticiesCount, startVertex, last] = lines[0].split(' ').map(Number);
  const graph = {};
  let i = 1;
  while (i <= verticiesCount) {
    graph[i] = {};
    i += 1;
  }
  for (let row = 1; row <= verticiesCount; row += 1) {
    lines[row].split(' ').forEach((dist, col) => {
      if (row !== col + 1 && dist !== '-1') {
        graph[row][col + 1] = Number(dist);
      }
    });
  }

  const [distances, previous] = dijkstra(graph, startVertex);
  // console.log(distances, previous);
  const path2 = [];
  let lastNode = last;
  while (lastNode !== null) {
    path2.push(lastNode);
    lastNode = previous[lastNode];
  }

  try {
    await fs.writeFile(
      'output.txt',
      `${distances[last] === Infinity ? -1 : path2.reverse().join(' ')}`,
    );
  } catch (err) {
    console.error(err.message);
  }
}

main();
