module.exports = function solution(N, M, s, t, trails) {
  const graph = {};

  trails.forEach((trail) => {
    const [start, end] = trail;
    if (graph[start] === undefined) {
      graph[start] = [end];
    } else {
      graph[start].push(end);
    }
  });

  function BFS(graph, source, destination) {
    const distance = [];
    distance[source] = 0;
    const prev = [source];

    const queue = [];
    queue.push(source);
    while (queue.length > 0) {
      const currentNode = queue.shift();
      if (graph[currentNode]) {
        graph[currentNode].forEach((neighbour) => {
          if (distance[neighbour] === undefined) {
            distance[neighbour] = distance[currentNode] + 1;
            prev[neighbour] = currentNode;
            queue.push(neighbour);
          }
        });
      }
    }
    const way = [];
    let lastNode = destination;
    while (lastNode !== undefined) {
      way.push(lastNode);
      if (lastNode && prev[lastNode]) {
        const index = graph[prev[lastNode]].indexOf(lastNode);
        graph[prev[lastNode]].splice(index, 1);
      }
      lastNode = prev[lastNode];
    }
    way.reverse();

    return distance[destination] === undefined ? false : way;
  }

  const pathDima = BFS(graph, s, t);
  const pathRoma = BFS(graph, s, t);

  if (pathDima !== false && pathRoma !== false) {
    return [pathDima, pathRoma];
  }

  return false;
};
