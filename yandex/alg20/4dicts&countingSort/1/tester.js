const fs = require('fs/promises');
const path = require('path');

async function read(file = 'input.txt') {
  try {
    return await fs.readFile(path.join(path.resolve(), file), {
      encoding: 'utf8',
    });
  } catch (err) {
    console.error(err.message);
  }
}

async function main() {
  const bot = await read('004a.txt');
  // bot = bot.split('\n')
  const js = await read('output.txt');
  // js = js.split('\n')
  console.log(bot === js);
  // console.log(js)
  // console.log('>>>>>>>>>>>>>> answer from bot \n', bot)
}
main();
