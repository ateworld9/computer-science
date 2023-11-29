function graphOfStates(graph, start, needed) {
  const distance = {};
  distance[start[0]] = {};
  distance[start[0]][start[1]] = 0;
  const previous = {};
  previous[start[0]] = {};
  previous[start[0]][start[1]] = -1;
  const queue = [];
  queue.push(start);
  while (queue.length > 0) {
    const state = queue.pop();

    if (state[0] === needed[0] && state[1] === needed[1]) {
      return [distance, previous];
    }
    graph[state[0]].forEach((el) => {
      if (el !== state[1] && distance[el]?.[state[1]] === undefined) {
        if (distance[el] === undefined) {
          distance[el] = {};
          previous[el] = {};
        }
        distance[el][state[1]] = distance[state[0]][state[1]] + 1;
        previous[el][state[1]] = state;
        queue.push([el, state[1]]);
      }
    });

    graph[state[1]].forEach((el) => {
      if (el !== state[0] && distance[state[0]][el] === undefined) {
        distance[state[0]][el] = distance[state[0]][state[1]] + 1;
        previous[state[0]][el] = state;
        queue.push([state[0], el]);
      }
    });
  }
  return [distance, previous];
}

const graph = {
  1: [2],
  2: [1, 3],
  3: [2, 4, 5],
  4: [3],
  5: [3],
};

const [dist, previous] = graphOfStates(graph, [1, 5], [5, 1]);
console.table(dist);
console.log(dist[5][1]);
let last = previous[5][1];
const way = [[5, 1]];
while (last !== -1) {
  way.push(last);
  last = previous[last[0]][last[1]];
}
way.reverse();
console.log(way);
