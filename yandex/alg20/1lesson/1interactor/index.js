const fs = require('fs/promises');
const path = require('path');

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
function returnCode(code, interactor, checker) {
  if (interactor === 0) {
    if (code !== 0) return 3;
    return checker;
  }

  if (interactor === 1) return checker;

  if (interactor === 4) {
    if (code !== 0) return 3;
    return 4;
  }

  if (interactor === 6) return 0;

  if (interactor === 7) return 1;

  return interactor;
}

async function main() {
  let str = await read();
  str = str.slice(0, -1);
  // parse file string
  const arr = str.split('\n').map(Number);
  const result = returnCode(...arr);

  try {
    await fs.writeFile('output.txt', result.toString());
  } catch (err) {
    console.error(err.message);
  }
}

main();
