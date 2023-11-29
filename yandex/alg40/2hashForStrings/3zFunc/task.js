const fs = require('node:fs/promises');
const path = require('node:path');

async function read(filename = 'input.txt') {
  try {
    return await fs.readFile(path.join(path.resolve(), filename), {
      encoding: 'utf8',
    });
  } catch (err) {
    console.error(err.message);
    return -1;
  }
}

function zFuncN2(str) {
  const zf = new Array(str.length).fill(0);
  for (let i = 1; i < str.length; i += 1) {
    while (i + zf[i] < str.length && str[zf[i]] === str[i + zf[i]]) {
      zf[i] += 1;
    }
  }
  return zf;
}

function zFunc(str) {
  const zf = new Array(str.length).fill(0);
  let left = 0;
  let right = 0;
  for (let i = 1; i < str.length; i += 1) {
    zf[i] = Math.max(0, Math.min(right - i, zf[i - left]));

    while (i + zf[i] < str.length && str[zf[i]] === str[i + zf[i]]) {
      zf[i] += 1;
    }
    if (i + zf[i] > right) {
      left = i;
      right = i + zf[i];
    }
  }
  return zf;
}

async function main() {
  let str = await read();

  str = str.slice(0, -1);
  // parse file string

  const res = zFunc(str);

  try {
    await fs.writeFile('output.txt', res.join(' '));
  } catch (err) {
    console.error(err.message);
  }
}

main();
