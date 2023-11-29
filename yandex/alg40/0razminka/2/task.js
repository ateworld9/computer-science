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

function gcd(a, b) {
  if (b === 0) {
    return a;
  }

  return gcd(b, a % b);
}

function addRat(numX, denX, numY, denY) {
  const numer = numX * denY + numY * denX;
  const denom = denX * denY;
  const g = gcd(numer, denom);
  return [numer / g, denom / g];
}

async function main() {
  let str = await read();

  str = str.slice(0, -1);
  // parse file string
  const [a, b, c, d] = str.split(' ').map(Number);

  const result = addRat(a, b, c, d);

  try {
    await fs.writeFile('output.txt', result.join(' '));
  } catch (err) {
    console.error(err.message);
  }
}

main();
