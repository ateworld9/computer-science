const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on('line', (line) => {
  lines.push(Number(line.trim()));
  if (lines.length >= 2) {
    console.log(line[0] + line[1]);
    rl.close();
  }
});
