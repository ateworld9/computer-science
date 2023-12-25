'use strict';

const DAY_OF_JUDGEMENT = Date.now() + Math.floor(Math.random() * 5000);

class Coming {
  constructor() {
    // async constructor
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(this);
      }, DAY_OF_JUDGEMENT - Date.now()),
    );
  }
}

(async () => {
  // need await because constructor returns Promise
  const secondComing = await new Coming();
  console.dir(secondComing);
})();
