// function binarySearch(arr, target) {
//   let left = 0;
//   let right = arr.length - 1;

//   while (left <= right) {
//     const mid = Math.floor((left + right) / 2);
//     const midValue = arr[mid];
//     if (midValue === target) {
//       return mid;
//     }
//     if (midValue < target) {
//       left = mid;
//     }
//     if (midValue > target) {
//       right = mid;
//     }
//   }
// }

const binarySearch = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const midIndex = (left + right) >> 1;
    // const midIndex = (left + right) >>> 1;
    // const midIndex = (left + right) / 2; // bug with int overflow
    const mid = nums[midIndex];
    if (mid === target) {
      return midIndex;
    } else if (mid > target) {
      right = midIndex - 1;
    } else {
      left = midIndex + 1;
    }
  }
  return -1;
};

const arr0 = [];

console.assert(binarySearch(arr0, 5) === -1, "test0 is not passed");

const arr1 = [7];

console.assert(binarySearch(arr1, 5) === -1, "test1 is not passed");

console.assert(binarySearch(arr1, 7) === 0, "test2 is not passed");
const arr2 = [4, 5];
console.assert(binarySearch(arr2, 4) === 0, "test3 is not passed");
console.assert(binarySearch(arr2, 5) === 1, "test4 is not passed");

console.assert(binarySearch(arr2, 6) === -1, "test5 is not passed");

const arr3 = [4, 5, 8];
console.assert(binarySearch(arr3, 4) === 0, "test6 is not passed");
console.assert(binarySearch(arr3, 5) === 1, "test7 is not passed");
console.assert(binarySearch(arr3, 8) === 2, "test8 is not passed");

console.assert(binarySearch(arr3, 6) === -1, "test9 is not passed");

const arr4 = [4, 5, 8, 8, 8, 8, 8, 8, 9];

console.log(binarySearch(arr4, 8));

console.assert(binarySearch(arr4, 8) === 4, "test10 is not passed");
