'use strict';

const promisify =
  (fn) =>
  (...args) =>
    new Promise((resolve, reject) => {
      args.push((err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
      fn(...args);
    });

const fs = require('node:fs');

const readFile = promisify(fs.readFile);

readFile('file1.txt', 'utf8')
  .then((data) => {
    console.log(data.toString());
    return readFile('file2.txt', 'utf8');
  })
  .then((data) => {
    console.log(data.toString());
    return readFile('file3.txt', 'utf8');
  })
  .then((data) => {
    console.log(data.toString());
    return readFile('file4.txt', 'utf8');
  })
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => {
    console.log(err.name);
    console.log(err.message);
  });

const util = require('node:util');

const readFile2 = util.promisify(fs.readFile);
readFile2('file1.txt', 'utf8')
  .then((data) => {
    console.log(data.toString());
    return readFile2('file2.txt', 'utf8');
  })
  .then((data) => {
    console.log(data.toString());
    return readFile2('file3.txt', 'utf8');
  })
  .then((data) => {
    console.log(data.toString());
    return readFile2('file4.txt', 'utf8');
  })
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => {
    console.log(err.name);
    console.log(err.message);
  });
