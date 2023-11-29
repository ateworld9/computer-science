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

function isAnagramm(a, b) {
  const map = {};
  const aArr = a.split("");
  aArr.forEach((char) => {
    if (map[char]) {
      map[char] += 1;
    } else {
      map[char] = 1;
    }
  });
  const bArr = b.split("");
  for (let i = 0; i < bArr.length; i += 1) {
    if (map[bArr[i]] > 0) {
      map[bArr[i]] -= 1;
    } else {
      return false;
    }
  }
  return true;
}

async function main() {
  let str = await read();

  str = str.slice(0, -1);
  // parse file string
  const arr = str.split("\n");
  const result = isAnagramm(...arr) ? "YES" : "NO";

  try {
    await fs.writeFile("output.txt", result);
  } catch (err) {
    console.error(err.message);
  }
}

main();
