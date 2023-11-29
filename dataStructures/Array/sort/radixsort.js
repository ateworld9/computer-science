/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
function countingsort(arr, digit) {
  const map = {};
  arr.forEach((el) => {
    map[el[digit]] = (map[el[digit]] ?? 0) + 1;
  });
  // console.log(map);

  let i = 0;
  for (const key in map) {
    const temp = map[key];
    map[key] = i;
    i += temp;
  }
  // console.log(map);

  const result = new Array(arr.length);
  for (let j = 0; j < arr.length; j += 1) {
    result[map[arr[j][digit]]] = arr[j];
    map[arr[j][digit]] += 1;
  }

  return result;
}

function radixsort(arr) {
  // Radix LSD(List Significant Digit)
  let digit = arr[0].length - 1;
  while (digit >= 0) {
    countingsort(arr, digit);
    digit -= 1;
  }

  return arr;
}
