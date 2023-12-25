console.log('1');

Promise.resolve('2').then(console.log);
const promise = new Promise((resolve) => {
  resolve('3');
});
promise.then(console.log);

setTimeout(() => {
  console.log('4');
});
setTimeout(() => {
  console.log('5');
}, 0);
