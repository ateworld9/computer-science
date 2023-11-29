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
  const str = await read();
  // str = str.slice(0, -1)
  let balance = 0;
  const brackets = str.split('');

  if (brackets[0] === ')') {
    await fs.writeFile('output.txt', 'NO');
    return;
  }

  for (let i = 0; i < brackets.length; i++) {
    if (brackets[i] === '(') balance += 1;
    if (brackets[i] === ')') balance -= 1;
  }

  console.log(brackets, balance);
  try {
    await fs.writeFile('output.txt', balance === 0 ? 'YES' : 'NO');
  } catch (err) {
    console.error(err.message);
  }
}

main();
