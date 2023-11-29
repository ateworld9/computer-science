function findTerms(arr, target) {
  // n^2
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length; j += 1) {
      if (i !== j && arr[i] + arr[j] === target) {
        return [i, j];
      }
    }
  }
  return -1;
}
console.log(findTerms([2, 7, 11, 15], 9));
