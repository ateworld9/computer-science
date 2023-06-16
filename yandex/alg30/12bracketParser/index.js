const fs = require('node:fs/promises')
const path = require('node:path')

async function read() {
  try {
    return await fs.readFile(path.join(path.resolve(), 'input.txt'), { encoding: 'utf8' })
  }
  catch (err) {
    console.error(err.message)
  }
}

async function main() {
  let data = ''
  const str = await read()
  const brackets = str.split('')
  brackets.pop()
  if (brackets.length === 0) {
    data = 'yes'
  }
  else {
    const stack = []

    let interrupt = false

    for (let i = 0; i < brackets.length; i += 1) {
      if (brackets[i] === '(' || brackets[i] === '[' || brackets[i] === '{')
        stack.push(brackets[i])
      if (brackets[i] === ')') {
        if (stack[stack.length - 1] === '(') {
          stack.pop()
        }
        else {
          interrupt = true
          break
        }
      }
      if (brackets[i] === ']') {
        if (stack[stack.length - 1] === '[') {
          stack.pop()
        }
        else {
          interrupt = true
          break
        }
      }
      if (brackets[i] === '}') {
        if (stack[stack.length - 1] === '{') {
          stack.pop()
        }
        else {
          interrupt = true
          break
        }
      }
    }

    if (stack.length === 0 && !interrupt)
      data = 'yes'
    else
      data = 'no'
  }

  try {
    await fs.writeFile('output.txt', data)
  }
  catch (err) {
    console.error(err.message)
  }
}

main()
