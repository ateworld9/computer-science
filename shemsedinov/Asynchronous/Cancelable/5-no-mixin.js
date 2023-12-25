const cancelable = (promise) => {
  let canceled = false;

  return {
    promise: promise.then((value) => {
      if (canceled) return Promise.reject(new Error('Canceled'));
      return value;
    }),
    cancel: () => {
      canceled = true;
    },
  };
};

// Usage

{
  const { promise, cancel } = cancelable(
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('first');
      }, 10);
    }),
  );

  promise.then(console.log).catch(console.log);
  console.dir({ promise });
}

{
  const { promise, cancel } = cancelable(
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('second');
      }, 10);
    }),
  );

  cancel();
  promise.then(console.log).catch(console.log);
  console.dir({ promise });
}
