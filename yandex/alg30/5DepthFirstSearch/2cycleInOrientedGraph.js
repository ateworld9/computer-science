/* eslint-disable no-restricted-syntax */
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

function makeAdjaencyList(edges, vertexCount) {
  const adjaencyList = new Array(vertexCount + 1);
  edges.forEach(([a, b]) => {
    if (adjaencyList[a] === undefined) {
      adjaencyList[a] = b === undefined ? [] : [b];
    } else {
      adjaencyList[a].push(b);
    }
  });

  for (let i = 1; i <= vertexCount; i += 1) {
    if (adjaencyList[i] === undefined) {
      adjaencyList[i] = [];
    }
  }

  return adjaencyList;
}

function doDFS(graph, vertexCount) {
  // 0 - white - not visited
  // 1 - grey - pending in current procedure
  // 2 - black - fulfilled, all iterations is completed
  const color = new Array(vertexCount + 1).fill(0);
  let isCycled = false;

  function DFS(now) {
    color[now] = 1;
    for (let i = 0; i < graph[now].length; i += 1) {
      if (color[graph[now][i]] === 1) {
        isCycled = true;
      }
      if (color[graph[now][i]] === 0 || color[graph[now][i]] === undefined) {
        DFS(graph[now][i]);
      }
    }
    color[now] = 2;
  }

  // запускаем для всех компонент связности
  for (let i = 1; i < graph.length; i += 1) {
    if (color[i] === 0) {
      DFS(i);
    }
  }

  return color;
}
const graph = makeAdjaencyListNotOriented(cityEdges);
console.log(graph);
const color = doDFS(graph);
console.log(color);
