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

function threeUnitsInRow(n, dp) {
  if (dp === undefined) {
    dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 2;
    dp[2] = 4;
    dp[3] = 7;
  }
  if (dp[n] === undefined) {
    dp[n] =
      threeUnitsInRow(n - 1, dp) +
      threeUnitsInRow(n - 2, dp) +
      threeUnitsInRow(n - 3, dp);
  }

  return dp[n];
}
async function main() {
  let str = await read();

  str = str.slice(0, -1);
  // parse file string

  console.log(str);
  const res = threeUnitsInRow(+str);

  try {
    await fs.writeFile("output.txt", res.toString());
  } catch (err) {
    console.error(err.message);
  }
}

main();
