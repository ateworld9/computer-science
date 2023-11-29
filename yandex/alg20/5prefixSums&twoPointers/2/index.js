const fs = require('fs/promises');
const path = require('path');

async function read(filename = 'input.txt') {
  try {
    return await fs.readFile(path.join(path.resolve(), filename), {
      encoding: 'utf8',
    });
  } catch (err) {
    console.error(err.message);
  }
}

function makePrefixSums(nums) {
  const prefixSum = new Array(nums.length + 1);
  prefixSum[0] = 0;
  for (let i = 1; i < prefixSum.length; i += 1)
    prefixSum[i] = prefixSum[i - 1] + nums[i - 1];

  return prefixSum;
}

async function main() {
  let str = await read();
  str = str.slice(0, -1);

  const arr = str.split('\n');
  const nums = arr[1].split(' ').map(Number);
  const prefixSums = makePrefixSums(nums);
  let maxSum = -Infinity;
  for (let i = 0; i < nums.length; i += 1) {
    for (let j = i + 1; j < nums.length + 1; j += 1) {
      const curSum = prefixSums[j] - prefixSums[i];
      if (curSum < 0) continue;
      if (curSum > maxSum) maxSum = curSum;
    }
  }

  try {
    await fs.writeFile('output.txt', maxSum.toString());
  } catch (err) {
    console.error(err.message);
  }
}

main();
