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

  const strings = str.split("\n");
  const arr = strings[1].split(" ").map(Number);
  const checks = strings[3].split(" ").map(Number);
  const answer = [];
  function leftBinarySearch(l, r, target) {
    while (l <= r) {
      let mid = l + Math.floor((r - l) / 2);
      if ((mid === 0 || arr[mid - 1] < target) && arr[mid] === target)
        return mid;
      else if (target > arr[mid]) l = mid + 1;
      else r = mid - 1;
    }
    return -1;
  }

  function rightBinarySearch(l, r, target) {
    while (l <= r) {
      let mid = l + Math.floor((r - l) / 2);
      if (
        (mid === arr.length - 1 || arr[mid + 1] > target) &&
        arr[mid] === target
      )
        return mid;
      else if (target < arr[mid]) r = mid - 1;
      else l = mid + 1;
    }
    return -1;
  }

  for (let i = 0; i < checks.length; i += 1) {
    const leftIndex = leftBinarySearch(0, arr.length - 1, checks[i]);
    const rightIndex = rightBinarySearch(0, arr.length - 1, checks[i]);

    answer.push(`${leftIndex + 1} ${rightIndex + 1}`);
  }
  try {
    await fs.writeFile("output.txt", answer.join("\n"));
  } catch (err) {
    console.error(err.message);
  }
}

main();
