// Дана отсортированная последовательность длинной N и число K
// Необходимо найти количество пар чисел A B таких что B - A > K
const arr = [1, 3, 7, 8]
const k = 4

// Решение за N^2
function countPairs(sortednums, k) {
  let count = 0
  for (let i = 0; i < sortednums.length; i++) {
    for (let j = i; j < sortednums.length; j++) {
      if (sortednums[j] - sortednums[i] > k)
        count += 1
    }
  }
  return count
}

console.log(countPairs(arr, k))

// Решение за N - Классическое для задач с двумя указателями
function countPairsN(arr, k) {
  let count = 0
  let last = 0
  for (let first = 0; first < arr.length; first += 1) {
    while (last < arr.length && arr[last] - arr[first] <= k)
      last += 1
    count += arr.length - last
  }
  return count
}
console.log(countPairsN(arr, k))
