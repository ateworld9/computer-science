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

// function floatBinarySearch(l, r, eps, check, checkparams) {
//   while (l + eps < r) {
//     const m = (l + r) / 2;
//     if (check(m, checkparams)) r = m;
//     else l = m;
//   }
//   return l;
// }

// function checkIsRoot(x, params) {
//   const [a, b, c, d] = params;
//   const res = a * x ** 3 + b * x ** 2 + c * x + d;
//   return res < 0 && res > 0;
// }

function f(x) {}

function findLeftBoard(C) {
  let x = -1;
  while (f(x) > C) {
    x = x * 2;
  }
  return x;
}

function findRightBoard(C) {
  let x = 1;
  while (f(x) < C) {
    x = x * 2;
  }
  return x;
}

function binSearch(C) {
  let left = findLeftBoard(C);
  let right = findRightBoard(C);
  while (right - left < eps) {
    let mid = (left + right) / 2;
    // Здесь можно использовать другое условие выхода
    if (f(mid) < C) {
      left = mid;
    } else {
      right = mid;
    }
  }
  return (left + right) / 2;
}

async function main() {
  let str = await read('cuberoot.in');
  str = str.slice(0, -1);
  const params = str.trim().split(' ').map(Number);
  const eps = 0.00001;
  const result = floatBinarySearch(-10, 10, eps, checkIsRoot, params);

  try {
    await fs.writeFile('cuberoot.out', `${result}`);
  } catch (err) {
    console.error(err.message);
  }
}

main();
