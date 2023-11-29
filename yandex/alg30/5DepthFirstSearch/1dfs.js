/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
// const vertexCount = 4;
// const edgesCount = 3;
// const edges = [[3, 1], [1, 2], [4, 3]];

// const adjaencyMatrix = new Array(vertexCount + 1); // requires a lot of ((v+1)^2) memory
// for (let i = 0; i < adjaencyMatrix.length; i += 1) {
//   adjaencyMatrix[i] = new Array(vertexCount + 1).fill(0);
// }

// edges.forEach(
//   ([a, b]) => {
//     adjaencyMatrix[a][b] = 1;
//     adjaencyMatrix[b][a] = 1;
//   },
// );

// console.table(adjaencyMatrix);

// const adjaencyList = { // most used structure to
// };

// edges.forEach(([a, b]) => {
//   if (adjaencyList[a] === undefined) {
//     adjaencyList[a] = [b];
//   } else {
//     adjaencyList[a].push(b);
//   }
//   if (adjaencyList[b] === undefined) {
//     adjaencyList[b] = [a];
//   } else {
//     adjaencyList[b].push(a);
//   }
// });
// console.table(adjaencyList);

// function depthFirstSearch(graph, now, visited = {}) {
//   visited[now] = true;

//   for (let i = 0; i < graph[now].length; i += 1) {
//     if (!Object.hasOwn(visited, graph[now][i])) {
//       depthFirstSearch(graph, graph[now][i], visited);
//     }
//   }
// }

// const visited = {};
// depthFirstSearch(adjaencyList, 1, visited);

// let component = 1;

// for (let i = 1; i < vertexCount; i += 1) {
//   if (!Object.hasOwn(visited, i)) {
//     depthFirstSearch(adjaencyList, i, visited, component);
//     component += 1;
//   }
// }

const cityEdges = [
  ["Moscow", "Ufa"],
  ["Ufa", "Vladivostok"],
  ["Moscow", "Bolshoe_Mokroe"],
  ["Bolshoe_Mokroe", "Vladivostok"],
  ["Saint_Petersburg", "Moscow"],
  ["Sochi", "Moscow"],
  ["Arkhangelsk", "Moscow"],
  ["Svetlogorsk", "Kaliningrad"],
  ["Yuzhno_Sakhalinsk"],
];

// function makeAdjaencyList2NotOriented(edges) {
//   const adjaencyList = {};

//   edges.forEach(([a, b]) => {
//     if (a !== undefined) {
//       if (adjaencyList[a] === undefined) {
//         adjaencyList[a] = b === undefined ? {} : { [b]: true };
//       } else {
//         adjaencyList[a][b] = true;
//       }
//     }
//     if (b !== undefined) {
//       if (adjaencyList[b] === undefined) {
//         adjaencyList[b] = { [a]: true };
//       } else {
//         adjaencyList[b][a] = true;
//       }
//     }
//   });

//   return adjaencyList;
// }

function makeAdjaencyListNotOriented(edges) {
  const adjaencyList = [];

  edges.forEach(([a, b]) => {
    if (a !== undefined) {
      if (adjaencyList[a] === undefined) {
        adjaencyList[a] = b === undefined ? [] : [b];
      } else {
        adjaencyList[a].push(b);
      }
    }
    if (b !== undefined) {
      if (adjaencyList[b] === undefined) {
        adjaencyList[b] = [a];
      } else {
        adjaencyList[b].push(a);
      }
    }
  });

  return adjaencyList;
}

function makeAdjaencyListOriented(edges) {
  const adjaencyList = {};

  edges.forEach(([a, b]) => {
    if (a !== undefined) {
      if (adjaencyList[a] === undefined) {
        adjaencyList[a] = b === undefined ? [] : [b];
      } else {
        adjaencyList[a].push(b);
      }
    }
    if (b !== undefined) {
      if (adjaencyList[b] === undefined) {
        adjaencyList[b] = [];
      }
    }
  });

  return adjaencyList;
}

function doDFS(graph) {
  const visited = {};

  function DFS(now, component) {
    visited[now] = component;
    for (let i = 0; i < graph[now].length; i += 1) {
      if (visited[graph[now][i]] === undefined) {
        DFS(graph[now][i], component);
      }
    }
  }

  let component = 1;

  for (const i of Object.keys(graph)) {
    if (visited[i] === undefined) {
      DFS(i, component);
      component += 1;
    }
  }

  return visited;
}
const graph = makeAdjaencyListNotOriented(cityEdges);
console.log(graph);
const visited = doDFS(graph);
console.log(visited);
