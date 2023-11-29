function findMaxAverage(nums, k) {
  // считаем сумму первого окна
  let sum = 0;
  for (let i = 0; i < k; i += 1) {
    sum += nums[i];
  }

  let res = sum; // храним максимальную сумму

  for (let i = k; i < nums.length; i += 1) {
    sum += nums[i] - nums[i - k]; // добавляем вошедший/убираем ушедший
    res = Math.max(res, sum);
  }

  return res / k;
}

console.assert(findMaxAverage([1, 12, -5, -6, 50, 3], 4) === 12.75);
