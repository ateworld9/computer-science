function findTerms(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) {
      return [left, right];
    }
    if (target > sum) {
      left += 1;
    } else {
      right -= 1;
    }
  }
  return -1;
}

console.log(findTerms([2, 7, 11, 15], 9));
