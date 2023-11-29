class Graph {
  constructor() {
    this.vertices = {}; // список смежности графа
  }

  addVertex(value) {
    if (!this.vertices[value]) {
      this.vertices[value] = [];
    }
  }

  addEdge(vertex1, vertex2) {
    if (!(vertex1 in this.vertices) || !(vertex2 in this.vertices)) {
      throw new Error("В графе нет таких вершин");
    }

    if (!this.vertices[vertex1].includes(vertex2)) {
      this.vertices[vertex1].push(vertex2);
    }
    if (!this.vertices[vertex2].includes(vertex1)) {
      this.vertices[vertex2].push(vertex1);
    }
  }

  static dfs(graph, startVertex, callback) {
    let stack = [startVertex]; // стек вершин для перебора
    const visited = { [startVertex]: 1 }; // посещенные вершины

    function handleVertex(vertex) {
      // вызываем коллбэк для посещенной вершины
      callback(vertex);

      // получаем список смежных вершин
      const reversedNeighboursList = [...graph[vertex]].reverse();

      reversedNeighboursList.forEach((neighbour) => {
        if (!visited[neighbour]) {
          // отмечаем вершину как посещенную
          visited[neighbour] = 1;
          // добавляем в стек
          stack.push(neighbour);
        }
      });
    }

    // перебираем вершины из стека, пока он не опустеет
    while (stack.length) {
      const activeVertex = stack.pop();
      handleVertex(activeVertex);
    }

    // проверка на изолированные фрагменты
    stack = Object.keys(graph);

    while (stack.length) {
      const activeVertex = stack.pop();
      if (!visited[activeVertex]) {
        visited[activeVertex] = 1;
        handleVertex(activeVertex);
      }
    }
  }

  bfs(startVertex, callback) {
    const list = this.vertices; // список смежности
    let queue = [startVertex]; // очередь вершин для перебора
    const visited = { [startVertex]: 1 }; // посещенные вершины

    function handleVertex(vertex) {
      // вызываем коллбэк для посещенной вершины
      callback(vertex);

      // получаем список смежных вершин
      const neighboursList = list[vertex];

      neighboursList.forEach((neighbour) => {
        if (!visited[neighbour]) {
          visited[neighbour] = 1;
          queue.push(neighbour);
        }
      });
    }

    // перебираем вершины из очереди, пока она не опустеет
    while (queue.length) {
      const activeVertex = queue.shift();
      handleVertex(activeVertex);
    }

    queue = Object.keys(this.vertices);

    // Повторяем цикл для незатронутых вершин
    while (queue.length) {
      const activeVertex = queue.shift();
      if (!visited[activeVertex]) {
        visited[activeVertex] = 1;
        handleVertex(activeVertex);
      }
    }
  }
}

const graph = new Graph();

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addVertex("G");
graph.addVertex("H");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("C", "D");
graph.addEdge("C", "E");
graph.addEdge("A", "F");
graph.addEdge("F", "G");

Graph.dfs(graph.vertices, "A", (v) => console.log(v));
