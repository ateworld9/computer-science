function merge(arr, left, mid, right) {
  let it1 = 0;
  let it2 = 0;
  const result = new Array(right - left);

  while (left + it1 < mid && mid + it2 < right) {
    if (arr[left + it1] < arr[mid + it2]) {
      result[it1 + it2] = arr[left + it1];
      it1 += 1;
    } else {
      result[it1 + it2] = arr[mid + it2];
      it2 += 1;
    }
  }

  while (left + it1 < mid) {
    result[it1 + it2] = arr[left + it1];
    it1 += 1;
  }

  while (mid + it2 < right) {
    result[it1 + it2] = arr[mid + it2];
    it2 += 1;
  }
  for (let i = 0; i < it1 + it2; i++) {
    arr[left + i] = result[i];
  }
}

function mergesort(arr, left = 0, right = arr.length) {
  if (left + 1 >= right) {
    return;
  }

  const middle = Math.floor((left + right) / 2);

  mergesort(arr, left, middle);
  mergesort(arr, middle, right);

  merge(arr, left, middle, right);
}

function mergesortIterative(arr) {
  for (let i = 1; i < arr.length; i *= 2) {
    for (let j = 0; j < arr.length - i; j += 2 * i) {
      merge(arr, j, j + i, Math.min(j + 2 * i, arr.length));
    }
  }
}

const arr = [
  406, 157, 415, 318, 472, 46, 252, 187, 364, 481, 450, 90, 390, 35, 452, 74,
  196, 312, 142, 160, 143, 220, 483, 392, 443, 488, 79, 234, 68, 150, 356, 496,
  69, 88, 177, 12, 288, 120, 222, 270, 441, 422, 103, 321, 65, 316, 448, 331,
  117, 183, 184, 128, 323, 141, 467, 31, 172, 48, 95, 359, 239, 209, 398, 99,
  440, 171, 86, 233, 293, 162, 121, 61, 317, 52, 54, 273, 30, 226, 421, 64, 204,
  444, 418, 275, 263, 108, 10, 149, 497, 20, 97, 136, 139, 200, 266, 238, 493,
  22, 17, 39,
];

mergesort(arr);
console.log(arr);
