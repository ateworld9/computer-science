const fs = require('fs/promises');
const path = require('path');

async function read(filename = 'input.txt') {
  try {
    return await fs.readFile(path.join(path.resolve(), filename), {
      encoding: 'utf8',
    });
  } catch (err) {
    console.error(err.message);
  }
}

async function main() {
  let str = await read('threesum.in');
  str = str.slice(0, -1);
  const arr = str.split('\n');
  const S = +arr[0];
  const A = arr[1].split(' ').slice(1).map(Number);
  const B = arr[2].split(' ').slice(1).map(Number);
  const Ct = arr[3].split(' ').slice(1);
  delete arr[0];
  delete arr[1];
  delete arr[2];
  delete arr[3];
  const C = {};
  Ct.forEach((num, i) => {
    if (C[num] === undefined) C[num] = i;
  });
  let answer = null;
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B.length; j++) {
      if (C[S - (A[i] + B[j])] >= 0) {
        answer = [i, j, C[S - (A[i] + B[j])]];
        i = A.length;
        break;
      }
    }
  }

  try {
    await fs.writeFile(
      'threesum.out',
      answer === null ? '-1' : answer.join(' '),
    );
  } catch (err) {
    console.error(err.message);
  }
}

main();
