/* eslint-disable symbol-description */
// 'use strict'

const symbol1 = Symbol()
const symbol2 = Symbol()

console.dir(symbol1)
console.log(JSON.stringify(symbol1))

console.log('Symbol() === Symbol() :', symbol1 === symbol2)

const symbol3 = Symbol('name')
const symbol4 = Symbol('name')

console.log('Symbol(\'name\') === Symbol(\'name\') :', symbol3 === symbol4)
