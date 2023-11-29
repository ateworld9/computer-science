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

function findMinimumInRange(arr, L, R) {
  let min = arr[L];
  for (let i = L + 1; i <= R; i += 1) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }
  return min;
}

// Функция для обработки запроса
function processQuery(sequence, L, R) {
  const minOnRange = findMinimumInRange(sequence, L, R);
  for (let i = L; i <= R; i += 1) {
    if (sequence[i] !== minOnRange) {
      return sequence[i];
    }
  }
  return "NOT FOUND";
}

// function processQuery(seq, l, r) {
//   let min = seq[l];
//   let other;
//   for (let j = l + 1; j <= r; j += 1) {
//     if (seq[j] < min) {
//       min = seq[j];
//     }
//     if (seq[j] > min) {
//       other = seq[j];
//     }
//   }
//   if (other > min) {
//     return other;
//   }
//   return 'NOT FOUND';
// }

async function main() {
  let str = await read();
  const result = [];

  str = str.slice(0, -1);
  const arr = str.split("\n");
  // const [seqLength, reqCtn] = arr[0].split(' ').map(Number);
  const seq = arr[1].split(" ").map(Number);

  for (let i = 2; i < arr.length; i += 1) {
    const [l, r] = arr[i].split(" ").map(Number);
    result.push(processQuery(seq, l, r));
  }

  try {
    await fs.writeFile("output.txt", result.join("\n"));
  } catch (err) {
    console.error(err.message);
  }
}

main();
