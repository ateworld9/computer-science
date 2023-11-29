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

async function main() {
  let str = await read("input.txt");
  str = str.slice(0, -1);
  console.log(str);
  try {
    await fs.writeFile("output.txt", "1");
  } catch (err) {
    console.error(err.message);
  }
}

main();
