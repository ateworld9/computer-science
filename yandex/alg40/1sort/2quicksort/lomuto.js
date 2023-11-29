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

function LomutoPartitioning(arr, low, high) {
  // разбиение на меньшие и большие
  const pivot = +arr[high];

  let i = low - 1;
  let j = low;

  while (j <= high - 1) {
    if (+arr[j] <= pivot) {
      i++;
      swap(arr, i, j);
    }
    j++;
  }

  i++;
  swap(arr, i, j);
  return i;
}

function quicksort(arr, low = 0, high = arr.length - 1) {
  if (low >= high || low < 0) {
    return;
  }

  const p = LomutoPartitioning(arr, low, high);

  quicksort(arr, low, p - 1);
  quicksort(arr, p + 1, high);
}

async function main() {
  let str = await read();

  str = str.slice(0, -1);
  // parse file string

  let arr = [];
  const lines = str.split("\n");
  if (lines[1]?.length > 0) {
    arr = lines[1]?.split(" ").map(Number);
    // console.log(arr, +lines[2]);
    quicksort(arr);
  }
  try {
    await fs.writeFile("output.txt", arr.join(" "));
  } catch (err) {
    console.error(err.message);
  }
}

main();
