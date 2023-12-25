const sleep = (msec) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, msec);
  });

(async () => {
  console.log('Start sleep: ' + new Date().toISOString());
  console.log('   Sleep about 3 seconds');
  sleep(3000);
  console.log('After sleep:' + new Date().toISOString());
})();
