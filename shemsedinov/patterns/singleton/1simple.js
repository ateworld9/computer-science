function Singleton() {
  // eslint-disable-next-line prefer-destructuring
  const instance = Singleton.instance;
  if (instance) return instance;
  Singleton.instance = this;
}
// Usage
// eslint-disable-next-line no-self-compare
console.assert(new Singleton() === new Singleton());
console.log('instances are equal');
// But instance is accessible

const a1 = new Singleton();
console.log(a1);
Singleton.instance = null;
console.log('remove instance');
const a2 = new Singleton();
if (a1 !== a2) console.log('a1 !== a2');
