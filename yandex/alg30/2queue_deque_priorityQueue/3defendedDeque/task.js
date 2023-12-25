const readline = require('node:readline');
// const fs = require('node:fs');

const rl = readline.createInterface({
  input: process.stdin,
  // input: fs.createReadStream('input.txt'),
  output: process.stdout,
});

let queue = [];
const result = [];
rl.on('line', (line) => {
  line = line.trim();
  switch (line) {
    case 'pop_front':
      if (queue.length === 0) {
        result.push('error');
      } else {
        result.push(queue.shift());
      }
      break;
    case 'pop_back':
      if (queue.length === 0) {
        result.push('error');
      } else {
        result.push(queue.pop());
      }
      break;
    case 'front':
      if (queue.length === 0) {
        result.push('error');
      } else {
        result.push(queue[0]);
      }
      break;
    case 'back':
      if (queue.length === 0) {
        result.push('error');
      } else {
        result.push(queue[queue.length - 1]);
      }
      break;
    case 'size':
      result.push(queue.length);
      break;
    case 'clear':
      queue = [];
      result.push('ok');
      break;
    case 'exit':
      result.push('bye');
      console.log(result.join('\n'));
      process.exit(0);
    // eslint-disable-next-line no-fallthrough
    default:
      // eslint-disable-next-line no-case-declarations
      const [command, val] = line.split(' ');
      switch (command) {
        case 'push_front':
          queue.unshift(+val);
          result.push('ok');
          break;
        case 'push_back':
          queue.push(+val);
          result.push('ok');
      }
  }
});
