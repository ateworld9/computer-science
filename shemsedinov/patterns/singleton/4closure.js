const singleton = (() => {
  const instance = {};
  return () => instance;
})();

const singleton2 = (
  (instance) => () =>
    instance
)({}); // don't understand

// Usage
// eslint-disable-next-line no-self-compare
console.assert(singleton() === singleton());
console.log('instances are equal');

// eslint-disable-next-line no-self-compare
console.assert(singleton2() === singleton2());
console.log('instances 2 are equal');
