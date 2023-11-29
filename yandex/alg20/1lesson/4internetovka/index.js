const fs = require("fs/promises");
const path = require("path");

async function read() {
  try {
    return await fs.readFile(path.join(path.resolve(), "input.txt"), {
      encoding: "utf8",
    });
  } catch (err) {
    console.error(err.message);
  }
}

function foo(arr) {
  return arr[Math.floor(arr.length / 2)];
}

async function main() {
  let str = await read();
  str = str.slice(0, -1);
  // parse file string
  const arrs = str.split("\n");
  const arr = arrs[1].split(" ").map(Number);

  const result = foo(arr);

  try {
    await fs.writeFile("output.txt", result.toString());
  } catch (err) {
    console.error(err.message);
  }
}

main();
