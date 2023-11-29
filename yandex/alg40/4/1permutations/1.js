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

async function main() {
  const str = await read();
  const n = parseInt(str, 10);
  const result = [];

  function swap(arr, i, j) {
    const toSwap = arr[i];
    arr[i] = arr[j];
    arr[j] = toSwap;
  }

  function gen(p, cur) {
    if (cur == n) {
      result.push(p.join(""));
    } else {
      for (let i = cur; i < n; i += 1) {
        swap(p, i, cur);
        gen(p, cur + 1);
        swap(p, i, cur);
      }
    }
  }

  const p = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  gen(p.slice(0, n), 0);

  // console.log(result.join('\n'));
  try {
    await fs.writeFile("output.txt", result.sort().join("\n"));
  } catch (err) {
    console.error(err.message);
  }
}

main();
