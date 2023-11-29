/* eslint-disable for-direction */
const fs = require('node:fs/promises');
const path = require('node:path');

async function read(filename = 'input.txt') {
  try {
    return await fs.readFile(path.join(path.resolve(), filename), {
      encoding: 'utf8',
    });
  } catch (err) {
    console.error(err.message);
    return -1;
  }
}
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i < coins.length; i += 1) {
    for (let j = coins[i]; j <= amount; j += 1) {
      dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

async function main() {
  let str = await read();

  str = str.slice(0, -1);
  // parse file string

  let arr = str.split('\n').slice(1);
  arr = arr.map((el) => el.split(' ').map(Number));
  const result = [];

  // const [n, a, b] = arr[14];
  // result.push(greedy(n, a, b) ? 'YES' : 'NO');

  arr.forEach((el) => {
    const [n, a, b] = el;
    const coins = [];
    for (let i = a; i <= b; i += 1) {
      coins.push(i);
    }
    result.push(coinChange(coins, n) === -1 ? 'NO' : 'YES');
  });

  try {
    await fs.writeFile('output.txt', result.join('\n'));
  } catch (err) {
    console.error(err.message);
  }
}

main();
