/* eslint-disable for-direction */
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

function averageLevelOfDissatisfation(arr) {
  const result = [];
  for (let j = 0; j < arr.length; j += 1) {
    let sum = 0;
    for (let i = 0; i < arr.length; i += 1) {
      sum += Math.abs(arr[i] - arr[j]);
    }
    result.push(sum);
  }

  return result;
}

function averageLevelOfDissatisfation2(arr) {
  let sum = 0;
  const result = [];

  for (let i = 0; i < arr.length; i += 1) {
    const dis = i * arr[i] - sum;
    sum += arr[i];

    result[i] = dis;
  }

  sum = 0;

  for (let i = arr.length - 1; i >= 0; i -= 1) {
    const dis = sum - (arr.length - 1 - i) * arr[i];
    sum += arr[i];

    result[i] += dis;
  }

  return result;
}

async function main() {
  const str = await read();
  const arr = str.split("\n")[1].split(" ").map(Number);

  const result = averageLevelOfDissatisfation2(arr);
  try {
    await fs.writeFile("output.txt", result.join(" "));
  } catch (err) {
    console.error(err.message);
  }
}

main();
