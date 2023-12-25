const readline = require('readline');

const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const midIndex = (left + right) >>> 1;
    const mid = arr[midIndex];
    if (mid === target) {
      return midIndex;
    } else if (mid < target) {
      left = midIndex + 1;
    } else {
      right = midIndex - 1;
    }
  }
  return false;
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on('line', (line) => {
  lines.push(line.trim().split(' ').map(Number));
});

rl.on('close', () => {
  const result = [];
  lines[2].forEach((el) => {
    const res = binarySearch(lines[1], el);
    result.push(res === false ? 'NO' : 'YES');
  });
  console.log(result.join('\n'));
});
