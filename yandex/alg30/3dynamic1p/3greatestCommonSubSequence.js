/* eslint-disable default-param-last */
/* eslint-disable no-param-reassign */
function greatestCommonSubSequence(arr, n = arr.length - 1, dp, prev) {
  if (dp === undefined) {
    dp = new Array(arr.length);
    dp[0] = 1;
  }
  if (prev === undefined) {
    prev = new Array(arr.length);
    prev[0] = -1; // -1 признак того что предыдущего не было
  }

  if (dp[n] === undefined) {
    let prevGreatest = 0;
    let prevGreatestIndex = -1;
    for (let i = 0; i < n; i += 1) {
      const temp = greatestCommonSubSequence(arr, i, dp, prev);
      if (arr[i] < arr[n]) {
        if (temp > prevGreatest) {
          prevGreatest = temp;
          prevGreatestIndex = i;
        }
      }
    }
    dp[n] = prevGreatest + 1;
    prev[n] = prevGreatestIndex;
  }
  console.log("dp>", dp);
  console.log("prev>", prev);
  return dp[n];
}

console.log(greatestCommonSubSequence([4, 10, 5, 12, 3, 24, 7, 8]));
