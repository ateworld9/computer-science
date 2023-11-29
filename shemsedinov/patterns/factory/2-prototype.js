/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
// 'use strict'

const logable = (fields) => {
  function Logable(data) {
    this.values = data;
  }

  for (const key in fields) {
    Object.defineProperty(Logable.prototype, key, {
      get() {
        console.log("Reading key: ", key);
        return this.values[key];
      },
      set(value) {
        console.log("Writing key: ", key, " value: ", value);
        const def = fields[key];
        // eslint-disable-next-line valid-typeof
        const valid = typeof value === def.type && def.validate(value);
        if (valid) this.values[key] = value;
        else console.log("Validation failed: ", key, value);
      },
    });
  }

  Logable.prototype.toString = function () {
    let result = `${this.constructor.name}: `;
    for (const key in fields) {
      result += `${this.values[key]} `;
    }
    return result;
  };

  return Logable;
};

// Usage
const Person = logable({
  name: { type: "string", validate: (name) => name.length > 0 },
  born: { type: "number", validate: (born) => !(born % 1) },
});

const p1 = new Person({ name: "Dmitriy Vakhrameev", born: 1999 });
console.log(p1.toString());
p1.born = 1997;
console.log(p1.born);
p1.born = 1996.5;
p1.name = "Ilya Zoreev";
console.log(p1.toString());
