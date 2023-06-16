// Дана последовательность чисел длиной N и M запросов к ней
// Запросы: Сколько нулей на полуинтервале(от l включительно, до r невключительно)
// ----------------------------------------------------------

// Решение за n * m
function countZeroes(nums, l, r) {
  let count = 0
  nums.forEach((el) => {
    if (el === 0)
      count += 1
  })
  return count
}

// Решение за n + m
function makePrefixZeroes(nums) {
  const prefixZeroes = new Array(nums.length + 1)
  prefixZeroes[0] = 0
  for (let i = 1; i < prefixZeroes.length; i += 1) {
    if (nums[i - 1] === 0)
      prefixZeroes[i] = prefixZeroes[i - 1] + 1
    else
      prefixZeroes[i] = prefixZeroes[i - 1]
  }

  return prefixZeroes
}

function rangeSumQuery(prefixSum, l, r) {
  return prefixSum[r] - prefixSum[l]
}
