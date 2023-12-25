const solution = require('./source.js');
const [N, M, s, t] = [5, 6, 1, 5];
const trails = [
  [1, 2],
  [2, 3],
  [3, 5],
  [1, 2],
  [2, 4],
  [4, 5],
];

console.log(solution(N, M, s, t, trails));

const trails2 = [
  [2, 3],
  [3, 5],
  [1, 2],
  [2, 4],
  [4, 5],
];

console.log(solution(N, M, s, t, trails2));

const trails3 = [];

console.log(solution(N, M, s, t, trails3));
