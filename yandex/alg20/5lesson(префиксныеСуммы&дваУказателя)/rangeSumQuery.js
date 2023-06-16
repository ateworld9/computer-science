function makePrefixSum(nums) {
  const prefixSum = new Array(nums.length + 1)
  prefixSum[0] = 0
  for (let i = 1; i < prefixSum.length; i += 1)
    prefixSum[i] = prefixSum[i - 1] + nums[i - 1]

  return prefixSum
}

function rangeSumQuery(prefixSum, l, r) {
  return prefixSum[r] - prefixSum[l]
}
