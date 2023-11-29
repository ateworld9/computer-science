/* eslint-disable no-self-compare */
const symbol1 = Symbol.for("name");
const symbol2 = Symbol.for("name");

if (symbol1 === symbol2) {
  console.log(
    "Symbols with identical description from global registry list are equal",
  );
}

console.log("symbol1: ", symbol1);
console.log('Symbol("name"): ', Symbol("name"));
console.log('Symbol.for("name"): ', Symbol.for("name"));

console.log(
  "Symbol('name') === Symbol.for('name')",
  Symbol("name") === Symbol.for("name"),
);
console.log(
  "Symbol.for('name') === Symbol.for('name')",
  Symbol.for("name") === Symbol.for("name"),
);

const symbol3 = Symbol("name2");
console.log(
  "key for symbol1 from global registry list:",
  Symbol.keyFor(symbol1),
);
console.log(
  "key for symbol3 which ist in global registry list:",
  Symbol.keyFor(symbol3),
);

console.log(symbol1[Symbol.toPrimitive]());
