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

function foo(arr1, arr2) {
  const set = arr1.reduce((acc, cur) => {
    acc[cur] = true;
    return acc;
  }, {});
  let count = 0;
  arr2.forEach((el) => {
    if (set[el]) count++;
  });
  return count;
}

async function main() {
  let str = await read();
  str = str.slice(0, -1);
  // parse file string
  const arrs = str.split("\n");

  const result = foo(arrs[0].split(" "), arrs[1].split(" "));

  try {
    await fs.writeFile("output.txt", result.toString());
  } catch (err) {
    console.error(err.message);
  }
}

main();
