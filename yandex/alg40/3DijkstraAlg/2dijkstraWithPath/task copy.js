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

class Heap {
  constructor(comparator) {
    this.arr = [];
    this.map = new Map();
    this.comparator = comparator;
  }

  isCorrectOrder(first, second) {
    return this.comparator(first, second) < 0;
  }

  leftChild(parentIndex) {
    return this.arr[2 * parentIndex + 1];
  }

  rightChild(parentIndex) {
    return this.arr[2 * parentIndex + 2];
  }

  parent(childIndex) {
    return this.arr[Math.floor((childIndex - 1) / 2)];
  }

  hasLeftChild(parentIndex) {
    return 2 * parentIndex + 1 < this.arr.length;
  }

  hasRightChild(parentIndex) {
    return 2 * parentIndex + 2 < this.arr.length;
  }

  isEmpty() {
    return !this.arr.length;
  }

  swap(indexOne, indexTwo) {
    const tmp = this.arr[indexTwo];
    this.arr[indexTwo] = this.arr[indexOne];
    this.arr[indexOne] = tmp;

    this.map.set(this.arr[indexOne], indexOne);
    this.map.set(this.arr[indexTwo], indexTwo);
  }

  push(item) {
    this.arr.push(item);
    this.map.set(item, this.arr.length - 1);
    this.heapifyUp();
    return this;
  }

  heapifyUp(startIndex) {
    let currentIndex = startIndex || this.arr.length - 1;

    while (
      Math.floor((currentIndex - 1) / 2) >= 0 &&
      !this.isCorrectOrder(this.parent(currentIndex), this.arr[currentIndex])
    ) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  peek() {
    if (this.arr.length === 0) {
      return null;
    }

    return this.arr[0];
  }

  pop() {
    if (this.arr.length === 0) {
      return null;
    }

    if (this.arr.length === 1) {
      this.map.delete(this.arr[0]);
      return this.arr.pop();
    }

    const item = this.arr[0];
    this.map.delete(item);

    this.arr[0] = this.arr.pop();
    this.map.set(this.arr[0], 0);

    this.heapifyDown();

    return item;
  }

  heapifyDown(customStartIndex = 0) {
    let currentIndex = customStartIndex;
    let nextIndex = null;

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) &&
        this.isCorrectOrder(
          this.rightChild(currentIndex),
          this.leftChild(currentIndex),
        )
      ) {
        nextIndex = 2 * currentIndex + 2;
      } else {
        nextIndex = 2 * currentIndex + 1;
      }

      if (this.isCorrectOrder(this.arr[currentIndex], this.arr[nextIndex])) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }
}

function dijkstra2(graph, start) {
  const visited = {};
  const distances = {};
  const heap = new Heap((a, b) => {
    if (a[0] == b[0]) return a[1] - b[1];
    return a[0] - b[0];
  });

  const verticies = Object.keys(graph);
  verticies.forEach((vertex) => {
    // console.log(vertex, start);
    if (vertex == start) {
      distances[vertex] = [0, vertex];
      heap.push(distances[vertex]);
    } else {
      distances[vertex] = [Infinity, vertex];
      heap.push(distances[vertex]);
    }
  });

  function handleVertex(vertex) {
    // расстояние до вершины
    const activeVertexDistance = vertex[0];
    const neighbours = graph[vertex[1]];
    // console.log('curr', vertex[1], graph[vertex[1]]);
    // для всех смежных вершин пересчитать расстояния
    Object.keys(neighbours).forEach((neighbourVertex) => {
      const currentNeighbourDistance = distances[neighbourVertex][0];
      const newNeighbourDistance =
        activeVertexDistance + neighbours[neighbourVertex];
      if (newNeighbourDistance < currentNeighbourDistance) {
        distances[neighbourVertex][0] = newNeighbourDistance;
      }
    });
    heap.heapifyDown();

    visited[vertex] = 1;
  }

  // console.table(heap.arr);
  // console.table(heap.map);

  // ищем самую близкую вершину из необработанных
  // продолжаем цикл, пока остаются необработанные вершины
  while (!heap.isEmpty()) {
    handleVertex(heap.pop());
    // console.table(heap.arr);
    // console.table(heap.map);
  }

  return distances;
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

  const distances2 = dijkstra2(graph, startVertex);
  console.log(distances[last]);
  console.log(distances2[last][0]);

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
