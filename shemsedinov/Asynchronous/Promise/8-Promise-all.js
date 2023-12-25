'use strict';

const baseUrl = 'http://localhost:3000';

const promises = [
  fetch(baseUrl + '/person'),
  fetch(baseUrl + '/'),
  fetch(baseUrl + '/city'),
];

Promise.all(promises)
  .then((values) => {
    console.log('all', values);
  })
  .catch((err) => {
    console.log(err);
  });

Promise.allSettled(promises)
  .then((values) => {
    console.log('allSettled', values);
  })
  .catch((err) => {
    console.log(err);
  });

Promise.any(promises)
  .then((values) => {
    console.log(values);
  })
  .catch((err) => {
    console.log(err);
  });

Promise.race(promises)
  .then((values) => {
    console.log(values);
  })
  .catch((err) => {
    console.log(err);
  });
