const fs = require('fs/promises')
const path = require('path')

async function read(filename = 'input.txt') {
  try {
    return await fs.readFile(path.join(path.resolve(), filename), { encoding: 'utf8' })
  }
  catch (err) {
    console.error(err.message)
  }
}

function leftBinarySearch(l, r, check, checkparams) {
  while (l < r) {
    const m = Math.floor((l + r) / 2)
    if (check(m, checkparams))
      r = m
    else
      l = m + 1
  }
  return l
}

function rightBinarySearch(l, r, check, checkparams) {
  while (l < r) {
    const m = Math.ceil((l + r) / 2)
    if (check(m, checkparams))
      l = m
    else
      r = m - 1
  }
  return l
}

async function main() {
  let str = await read('input.txt')
  const strings = str.split('\n')
  const arr = strings[1].split(' ').map(Number).sort((a, b) => a - b)
  const LRarr = strings.slice(3).map(el => el.split(' ').map(Number))
  const answer = []
  for (let i = 0; i < strings[2]; i += 1) {
    const leftIndex = leftBinarySearch(0, arr.length - 1, m => LRarr[i][0] <= arr[m])
    const rightIndex = rightBinarySearch(0, arr.length - 1, m => LRarr[i][1] >= arr[m])
    if (leftIndex === 0 && rightIndex === 0) {
      if (arr[leftIndex] === LRarr[i][0] && arr[rightIndex] === LRarr[i][1])
        answer.push(1)

      else
        answer.push(0)
    }
    else {
      answer.push(rightIndex + 1 - leftIndex)
    }
  }

  try {
    await fs.writeFile('output.txt', answer.join(' '))
  }
  catch (err) {
    console.error(err.message)
  }
}

main()
