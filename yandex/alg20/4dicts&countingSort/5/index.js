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
  let str = await read();
  str = str.slice(0, -1);
  const arr = str.split("\n");
  const topics = [];
  const messages = [];
  let i = 1;
  let j = 0;
  while (i < arr.length) {
    if (+arr[i] === 0) {
      messages[j] = j;
      topics.push(arr[i + 1]);
      i += 3;
    } else {
      messages[j] = messages[arr[i] - 1];
      i += 2;
    }
    j++;
  }
  const dict = {};
  let max = 0;
  for (let i = 0; i < messages.length; i++) {
    dict[messages[i]] = (dict[messages[i]] ?? 0) + 1;
    if (dict[messages[i]] > max) max = dict[messages[i]];
  }
  console.log(topics, messages, dict);

  let result = "";

  for (let i = 0; i < topics.length; i++) {
    if (dict[i] === max) {
      result = topics[i];
      break;
    }
  }

  // console.log(topics, messages, dict, result)

  try {
    await fs.writeFile("output.txt", result);
  } catch (err) {
    console.error(err.message);
  }
}

main();
