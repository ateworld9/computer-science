// алгоритм:
// 1) получить левую и правую границу
// 2) вычислить середину л + п / 2 (с округлением)
// 3) проверка
// 3.1) если true

// function leftBinarySearch(l, r, check, checkparams) {
//   while (l < r) {
//     const m = Math.floor((l + r) / 2)
//     if (check(m, checkparams))
//       r = m
//     else
//       l = m + 1
//   }
//   return l
// }

// function rightBinarySearch(l, r, check, checkparams) {
//   while (l < r) {
//     const m = Math.ceil((l + r) / 2)
//     if (check(m, checkparams))
//       l = m
//     else
//       r = m - 1
//   }
//   return l
// }

function leftBinarySearch(arr, target) {
  let l = 0;
  let r = arr.length;
  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);
    if (mid === 0 && arr[mid] === target) {
      return mid;
    }
    if (arr[mid - 1] < target && arr[mid] === target) {
      return mid;
    }
    if (target > arr[mid]) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return -1;
}

function rightBinarySearch(arr, target) {
  let l = 0;
  let r = arr.length;
  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);
    if (
      (mid === arr.length - 1 || arr[mid + 1] > target) &&
      arr[mid] === target
    ) {
      return mid;
    }
    if (target < arr[mid]) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return -1;
}
