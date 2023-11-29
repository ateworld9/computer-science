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

function count(arr) {
  const stack = [];

  for (let i = 0; i < arr.length; i += 1) {
    if (!Number.isNaN(+arr[i])) {
      stack.push(+arr[i]);
    } else {
      const first = stack.at(-2);
      const second = stack.at(-1);
      let result;
      if (arr[i] === "+") result = first + second;
      if (arr[i] === "-") result = first - second;
      if (arr[i] === "*") result = first * second;

      stack.pop();
      stack.pop();
      stack.push(result);
    }
  }

  return stack[0];
}

async function main() {
  let str = await read();
  str = str.slice(0, -1);
  const arr = str.split(" ");

  const result = count(arr);

  try {
    await fs.writeFile("output.txt", result.toString());
  } catch (err) {
    console.error(err.message);
  }
}

main();
