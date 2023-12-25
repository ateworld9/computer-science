const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on('line', (line) => {
  lines.push(line.trim());
});

const tinkoff = {
  T: 1,
  I: 1,
  N: 1,
  K: 1,
  O: 1,
  F: 2,
};
const tinkoffKeys = Object.keys(tinkoff);

const compare = (word) => {
  const charCount = {};

  for (const char of word) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  const keys1 = Object.keys(charCount);

  if (keys1.length !== tinkoffKeys.length) {
    return 'No';
  }

  for (let key of keys1) {
    if (charCount[key] !== tinkoff[key]) {
      return 'No';
    }
  }

  return 'Yes';
};

rl.on('close', () => {
  const words = lines.slice(1);

  const results = [];

  words.forEach((word) => {
    results.push(compare(word));
  });

  console.log(results.join('\n'));
});
