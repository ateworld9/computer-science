/* eslint-disable prefer-destructuring, no-param-reassign */
function steps(n, dp) {
  if (dp === undefined) {
    dp = new Array(n + 1);
    dp[0] = 1;
    dp[1] = 2;
    dp[2] = 4;
  }
  if (dp[n] === undefined) {
    dp[n] = steps(n - 1, dp) + steps(n - 2, dp) + steps(n - 3, dp);
  }

  return dp[n];
}

console.log(steps(4));

const stepsCost = [0, 10, -5, -20, -10, 20, 30, -10, 10];

const stepsWithCost = (n, dp) => {
  if (dp === undefined) {
    dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = stepsCost[1];
  }

  if (dp[n] === undefined) {
    dp[n] =
      stepsCost[n] +
      Math.max(stepsWithCost(n - 1, dp), stepsWithCost(n - 2, dp));
  }

  return dp[n];
};

console.log(stepsWithCost(5));

const stepsCostWithSertificates = (n, dp, prev) => {
  if (dp === undefined) {
    dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = stepsCost[1];
  }
  if (prev === undefined) {
    prev = new Array(n + 1);
    prev[0] = 0;
    prev[1] = 0;
  }

  if (dp[n] === undefined) {
    const n1 = stepsCostWithSertificates(n - 1, dp, prev);
    const n2 = stepsCostWithSertificates(n - 2, dp, prev);
    if (n1 > n2) {
      dp[n] = stepsCost[n] + n1;
      prev[n] = n - 1;
    } else {
      dp[n] = stepsCost[n] + n2;
      prev[n] = n - 2;
    }
  }

  return dp[n];
};

const prev = new Array(3 + 1);
prev[0] = 0;
prev[1] = 0;
console.log(stepsCostWithSertificates(8, undefined, prev));
console.log(prev);
