const fs = require("fs/promises");
const path = require("path");

async function read(file = "input.txt") {
  try {
    return await fs.readFile(path.join(path.resolve(), file), {
      encoding: "utf8",
    });
  } catch (err) {
    console.error(err.message);
  }
}

async function main() {
  let py = await read("python.txt");
  py = py.split("\n");
  let js = await read("output.txt");
  js = js.split("\n");
  console.log(js);
  console.log(">>>>>>>>>>>>>>python \n", py);
}
main();
