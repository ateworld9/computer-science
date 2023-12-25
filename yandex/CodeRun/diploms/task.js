const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const findMinSide = function (width, height, count) {
  let side = width > height ? width : height;
  let current = 1;
  while (current < count) {
    side += width < height ? width : height;
    const row = Math.trunc(side / width);
    const column = Math.trunc(side / height);
    current = row * column;
  }
  return side;
};

rl.on('line', (line) => {
  const [width, height, count] = line.trim().split(' ').map(Number);

  const result = findMinSide(width, height, count);
  console.log(result);
  rl.close();
});
