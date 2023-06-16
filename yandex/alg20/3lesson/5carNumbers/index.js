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

async function main() {
  let str = await read()
  str = str.slice(0, -1)
  // parse file string
  const arr = str.split('\n')

  let i = 1
  const witness = []
  const suspects = []
  let maxMatch = 0
  const witnessCount = +arr[0] + 1

  while (i < witnessCount) {
    witness.push(new Set(arr[i]))
    i += 1
  }
  const suspectsCount = +arr[i] + witnessCount + 1
  i += 1

  while (i < suspectsCount) {
    const suspectSet = new Set(arr[i])
    let matchCount = 0

    witness.forEach((wit) => {
      wit.forEach((char) => {
        if (suspectSet.has(char))
          matchCount += 1
      })
    })
    if (matchCount > maxMatch)
      maxMatch = matchCount

    suspects.push([arr[i], matchCount])
    i += 1
  }
  // console.log(witness, suspects)
  const result = []
  suspects.forEach((el) => {
    if (el[1] === maxMatch)
      result.push(el[0])
  })

  try {
    await fs.writeFile('output.txt', `${result.join('\n')}\n`)
  }
  catch (err) {
    console.error(err.message)
  }
}

main()
