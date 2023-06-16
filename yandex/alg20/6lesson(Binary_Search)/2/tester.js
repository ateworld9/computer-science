const arr = [1, 2, 2, 3]

function binarySearch(start, end, key) {
  while (start <= end) {
    let m = Math.floor((start + (end - start)) / 2)

    if (arr[m] === key)
      return m + 1
    else if (arr[m] < key)
      start = m + 1
    else
      end = m - 1
  }
  return 0
}

console.log(binarySearch(0, arr.length - 1, 4))
console.log(binarySearch(0, arr.length - 1, 3))
console.log(binarySearch(0, arr.length - 1, 2))
console.log(binarySearch(0, arr.length - 1, 1))
