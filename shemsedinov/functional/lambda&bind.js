const log = (base, n) => Math.log(n) / Math.log(base)

// Usage

// const lg = (n) => log.bind(null, 10);
// const ln = (n) => log.bind(null, Math.E);

const lg = n => log(10)
const ln = n => log(Math.E)

console.log(`lg(5) = ${lg(5)}`)
console.log(`ln(5) = ${ln(5)}`)
