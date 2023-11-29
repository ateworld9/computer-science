const calcHourglassSum = (arr2D, I, J) => {
  const arr = [
    arr2D[I][J],
    arr2D[I][J + 1],
    arr2D[I][J + 2],
    arr2D[I + 1][J + 1],
    arr2D[I + 2][J],
    arr2D[I + 2][J + 1],
    arr2D[I + 2][J + 2],
  ];
  return arr.reduce((acc, num) => (acc += num), 0);
};

function hourglassSum(arr) {
  const arr2D = [];
  for (let i = 0; i <= 5; i += 1) {
    arr2D[i] = arr.slice(6 * i, (i + 1) * 6);
  }

  const hourglassSums = [];

  for (let i = 0; i < 4; i += 1) {
    for (let j = 0; j < 4; j += 1) {
      hourglassSums.push(calcHourglassSum(arr2D, i, j));
    }
  }

  let result = 0;

  for (let i = 0; i < hourglassSums.length; i += 1) {
    if (hourglassSums[i] > result) result = hourglassSums[i];
  }

  return result;
}

const h = [
  -9, -9, -9, 1, 1, 1, 0, -9, 0, 4, 3, 2, -9, -9, -9, 1, 2, 3, 0, 0, 8, 6, 6, 0,
  0, 0, 0, -2, 0, 0, 0, 0, 1, 2, 4, 0,
];

console.log(hourglassSum(h));
