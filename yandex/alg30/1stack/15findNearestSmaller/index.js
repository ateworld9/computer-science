const fs = require("node:fs/promises");
const path = require("node:path");

async function read() {
  try {
    return await fs.readFile(path.join(path.resolve(), "input.txt"), {
      encoding: "utf8",
    });
  } catch (err) {
    console.error(err.message);
  }
}

function findNearestSmaller(arr) {
  const stack = [];
  const result = [];

  for (let i = 0; i < arr.length; i += 1) {
    while (stack.length > 0 && stack[stack.length - 1][1] > arr[i]) {
      result[stack[stack.length - 1][0]] = i;
      stack.pop();
    }
    stack.push([i, arr[i]]);
  }

  stack.forEach((el) => {
    result[el[0]] = -1;
  });
  return result;
}

async function main() {
  let str = await read();
  str = str.slice(0, -1);
  // parse file string
  const arr = str.split("\n")[1].split(" ");
  const result = findNearestSmaller(arr.map(Number));

  try {
    await fs.writeFile("output.txt", result.join(" "));
  } catch (err) {
    console.error(err.message);
  }
}

main();
