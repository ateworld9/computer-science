/* eslint-disable no-param-reassign */
const fs = require("node:fs/promises");
const path = require("node:path");

async function read(filename = "input.txt") {
  try {
    return await fs.readFile(path.join(path.resolve(), filename), {
      encoding: "utf8",
    });
  } catch (err) {
    console.error(err.message);
    return -1;
  }
}

function grasshoper(n, k, dp) {
  if (dp === undefined) {
    dp = new Array(n + 1).fill(0);
    dp[0] = 0;
    dp[1] = 1;
  }

  for (let i = 2; i <= n; i += 1) {
    for (let j = 1; j <= k; j += 1) {
      if (i - j >= 1) {
        dp[i] += dp[i - j];
      }
    }
  }
  return dp[n];
}
async function main() {
  let str = await read();

  str = str.slice(0, -1);
  // parse file string

  const res = grasshoper(...str.split(" ").map(Number));

  try {
    await fs.writeFile("output.txt", res.toString());
  } catch (err) {
    console.error(err.message);
  }
}

main();
