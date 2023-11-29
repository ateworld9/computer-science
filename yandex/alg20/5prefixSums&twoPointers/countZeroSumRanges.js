// Дана последовательность чисел длинной N
// Необходимо найти количество отрезков с нулевой суммой
// ---------------------------------------------------------------

// Решение наивное(в лоб) за n ^ 3
// Переберем начало и конец отрезка и просуммируем все его элементы
function countZeroSumRangesn3(nums) {
  let countRanges = 0;
  for (let i = 0; i < nums.length; i += 1) {
    for (let j = 0; j < nums.length + 1; j += 1) {
      let rangesum = 0;
      for (let k = i; k < j; k += 1) rangesum += nums[k];
      if (rangesum === 0) countRanges += 1;
    }
  }

  return countRanges;
}

// Решение за n ^ 2
// Переберем начало и будем двигать конец, суммируя элементы
function countZeroSumRangesn2(nums) {
  let countRanges = 0;
  for (let i = 0; i < nums.length; i += 1) {
    let rangesum = 0;
    for (let j = i; j < nums.length; j += 1) {
      rangesum += nums[j];
      if (rangesum === 0) countRanges += 1;
    }
  }

  return countRanges;
}

// Решение за n
function countPrefixSums(nums) {
  const prefixSumByValue = { 0: 1 };
  let nowSum = 0;
  nums.forEach((num) => {
    nowSum += num;
    if (prefixSumByValue[nowSum] === undefined) prefixSumByValue[nowSum] = 0;
    prefixSumByValue[nowSum] += 1;
  });

  return prefixSumByValue;
}
function countZeroSumRanges(prefixSumByValue) {
  let countRanges = 0;

  for (const key in prefixSumByValue) {
    const countSum = prefixSumByValue[key];
    countRanges += (countSum * (countSum - 1)) / 2;
  }

  return countRanges;
}
