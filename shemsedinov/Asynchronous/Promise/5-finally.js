'use strict';

const fs = require('node:fs');

const readFile = (filename) => fs.promises.readFile(filename, 'utf8');

readFile('1file1.txt')
  .then((data) => {
    console.dir({ file1: data });
  })
  .catch((reason) => {
    console.log("Can't read file1.txt");
    console.log(reason);
  })
  .finally(() => {
    console.log('it executes anyway finally');
  });
