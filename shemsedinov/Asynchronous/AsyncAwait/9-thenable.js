'use strict';

const fs = require('node:fs');

class Thenable {
  constructor() {
    this.next = null;
  }

  then(onSuccess) {
    this.onSuccess = onSuccess;
    const next = new Thenable();
    this.next = next;
    return next;
  }
  resolve(value) {
    const onSuccess = this.onSuccess;
    if (onSuccess) {
      const next = onSuccess(value);
      if (next) {
        if (next.then) {
          next.then((value) => {
            this.next.resolve(value);
          });
        } else {
          this.next.resolve(next);
        }
      }
    }
  }
}

// Usage

const readFile = (filename) => {
  const thenable = new Thenable();
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err;
    thenable.resolve(data);
  });

  return thenable;
};

(async () => {
  const file1 = await readFile('9-thenable.js');
  console.dir({ length: file1.length });

  readFile('1-prototype.js')
    .then((data) => {
      console.dir({ file1: data.length });
      return readFile('2-sync.js');
    })
    .then((data) => {
      console.dir({ file2: data.length });
      return readFile('3-async.js');
    })
    .then((data) => {
      console.dir({ file3: data.length });
      return 'I will be printed by callback in the next then';
    })
    .then((data) => {
      console.dir({ text: data });
    })
    .then(() => {
      console.log('Will never printed');
    });
})();
