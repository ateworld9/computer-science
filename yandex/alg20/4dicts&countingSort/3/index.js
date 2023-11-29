const fs = require("fs/promises");
const path = require("path");

async function read(filename = "input.txt") {
  try {
    return await fs.readFile(path.join(path.resolve(), filename), {
      encoding: "utf8",
    });
  } catch (err) {
    console.error(err.message);
  }
}

function wordsCount(words) {
  const map = {};

  for (let i = 0; i < words.length; i++) {
    if (map[words[i]]) map[words[i]] += 1;
    else map[words[i]] = 1;
  }
  const result = Object.entries(map).sort((a, b) => {
    if (a[1] < b[1]) return 1;
    if (a[1] > b[1]) return -1;
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
  });
  for (let i = 0; i < result.length; i++) result[i] = result[i][0];
  return result.join("\n");
}

async function main() {
  let str = await read();
  str = str.slice(0, -1);
  const words = str
    .split("\n")
    .map((el) => el.split(" "))
    .flat();
  const result = wordsCount(words);

  try {
    await fs.writeFile("output.txt", result);
  } catch (err) {
    console.error(err.message);
  }
}

main();
