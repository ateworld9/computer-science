const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on('line', (line) => {
  lines.push(line.trim().split(' ').map(Number));
});

rl.on('close', () => {
  const first = lines[0];
  const second = lines[1];
  let counter = 0;
  while (first.length !== 0 && second.length !== 0) {
    counter += 1;
    // console.log(counter, first, second);
    const firstEl = first.shift();
    const secondEl = second.shift();
    // console.log(firstEl, secondEl);
    if (firstEl === 0 && secondEl === 9) {
      first.push(firstEl);
      first.push(secondEl);
    } else if (firstEl === 9 && secondEl === 0) {
      second.push(firstEl);
      second.push(secondEl);
    } else if (firstEl > secondEl) {
      first.push(firstEl);
      first.push(secondEl);
    } else {
      second.push(firstEl);
      second.push(secondEl);
    }
    if (counter === 1_000_000) {
      break;
    }
  }
  if (counter === 1_000_000) {
    console.log('botva');
  } else {
    console.log(first.length === 0 ? 'second' : 'first', counter);
  }
  process.exit(0);
});
