const readline = require('node:readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function calculator(num) {
  let x = 1
  let counter = 0
  const results = [1]

  while (x < num) {
    counter += 1
    if (x * 3 <= num)
      x = x * 3

    else if (x * 2 <= num)
      x = x * 2

    else if (x + 1 <= num)
      x = x + 1

    results.push(x)
  }
  console.log(counter)
  console.log(results.join(' '))
}

rl.on('line', (line) => {
  const num = parseInt(line)
  calculator(num)
  rl.close()
})
