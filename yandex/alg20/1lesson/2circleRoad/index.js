const fs = require('fs/promises')
const path = require('path')

async function read() {
  try {
    return await fs.readFile(path.join(path.resolve(), 'input.txt'), { encoding: 'utf8' })
  }
  catch (err) {
    console.error(err.message)
  }
}

function counter(count, i, j) {
  let counter = 0

  let ri = i
  let li = i

  while (true) {
    ri++
    if (ri === count + 1)
      ri = 1

    li--
    if (li === 0)
      li = count

    if (ri === j || li === j)
      break

    counter++
  }
  return counter
}

async function main() {
  let str = await read()
  str = str.slice(0, -1)
  // parse file string
  const arr = str.split(' ').map(Number)
  const result = counter(...arr)

  try {
    await fs.writeFile('output.txt', result.toString())
  }
  catch (err) {
    console.error(err.message)
  }
}

main()
