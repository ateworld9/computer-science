const fs = require("fs/promises");
const path = require("path");

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

function gistogramm(str) {
  const charMap = {};
  let maxCount = 0;
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === " " || str[i] === "\n") {
      continue;
    }
    if (charMap[str[i]]) {
      charMap[str[i]] += 1;
    } else {
      charMap[str[i]] = 1;
    }
    if (charMap[str[i]] > maxCount) {
      maxCount = charMap[str[i]];
    }
  }
  const sortedChars = Object.keys(charMap).sort();
  const result = [];
  for (let i = maxCount; i > 0; i -= 1) {
    const temp = [];
    sortedChars.forEach((char) => {
      if (charMap[char] >= i) {
        temp.push("#");
      } else {
        temp.push(" ");
      }
    });
    temp.push("\n");
    result[maxCount - i] = temp.join("");
  }
  sortedChars.push("\n");
  result[maxCount] = sortedChars.join("");
  return result.join("");
}

async function main() {
  let str = await read();
  str = str.slice(0, -1);
  const result = gistogramm(str);

  try {
    await fs.writeFile("output.txt", result);
  } catch (err) {
    console.error(err.message);
  }
}

main();
