const matrix = [
  new Array(6),
  new Array(1).concat([1, 1, 0, 0, 1, 0]),
  new Array(1).concat([1, 0, 1, 0, 1, 0]),
  new Array(1).concat([0, 1, 0, 1, 0, 0]),
  new Array(1).concat([0, 0, 1, 0, 1, 1]),
  new Array(1).concat([1, 1, 0, 1, 0, 0]),
  new Array(1).concat([0, 0, 0, 1, 0, 0]),
];

console.table(matrix);
function makeAdjaencyList(matrix, vertexCount) {
  const adjaencyList = new Array(vertexCount + 1);

  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1) {
      if (matrix[i][j] == 1) {
        if (adjaencyList[i + 1] === undefined) {
          adjaencyList[i + 1] = [j + 1];
        } else {
          adjaencyList[i + 1].push(j + 1);
        }
      }
    }
  }

  for (let i = 1; i <= vertexCount; i += 1) {
    if (adjaencyList[i] === undefined) {
      adjaencyList[i] = [];
    }
  }

  console.table(adjaencyList);
  return adjaencyList;
}

makeAdjaencyList(matrix, 6);
