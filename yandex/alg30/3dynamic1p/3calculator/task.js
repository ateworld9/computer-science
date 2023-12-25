const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function calculator(num) {
  const dp = new Array(num + 1).fill(Infinity);
  const prev = {};

  dp[1] = 0;

  for (let i = 1; i < num + 1; i++) {
    if (i * 2 <= num && dp[i * 2] > dp[i] + 1) {
      dp[i * 2] = dp[i] + 1;
      prev[i * 2] = i;
    }
    if (i * 3 <= num && dp[i * 3] > dp[i] + 1) {
      dp[i * 3] = dp[i] + 1;
      prev[i * 3] = i;
    }
    if (i + 1 <= num && dp[i + 1] > dp[i] + 1) {
      dp[i + 1] = dp[i] + 1;
      prev[i + 1] = i;
    }
  }

  const sequence = [];
  let i = num;
  while (i !== undefined) {
    sequence.push(i);
    i = prev[i];
  }
  sequence.reverse();
  console.log(dp[num]);
  console.log(sequence.join(' '));
  // return dp[num], sequence;
}

rl.on('line', (line) => {
  const num = Number(line);
  calculator(num);
  rl.close();
});
