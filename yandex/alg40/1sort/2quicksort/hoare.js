/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable for-direction */
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

function swap(arr, i, j) {
  const toSwap = arr[i];
  arr[i] = arr[j];
  arr[j] = toSwap;
}

function partitioning(arr, low, high) {
  const pivot = arr[Math.floor((low + high) / 2)];
  let i = low;
  let j = high;

  while (true) {
    while (arr[i] < pivot) {
      i += 1;
    }
    while (arr[j] > pivot) {
      j -= 1;
    }

    if (i >= j) {
      return j;
    }

    swap(arr, i, j);
    i += 1;
    j -= 1;
  }
}

function quicksort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const p = partitioning(arr, low, high);
    quicksort(arr, low, p);
    quicksort(arr, p + 1, high);
  }
}

async function main() {
  let str = await read();

  str = str.slice(0, -1);
  // parse file string

  let arr = [];
  const lines = str.split("\n");
  if (lines[1]?.length > 0) {
    arr = lines[1]?.split(" ").map(Number);
    quicksort(arr);
  }
  try {
    await fs.writeFile("output.txt", arr.join(" "));
  } catch (err) {
    console.error(err.message);
  }
}

main();
