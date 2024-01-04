function findMaxAverage(nums, k) {
	let maxAverage = Number.MIN_VALUE;

	for (let i = 0; i < nums.length - k + 1; i += 1) {
		let sum = 0; // сумма следующих k элементов

		for (let j = i; j < i + k; j += 1) {
			sum += nums[j];
		}
		const average = sum / k;
		maxAverage = Math.max(maxAverage, average);
	}

	return maxAverage;
}

console.assert(findMaxAverage([1, 12, -5, -6, 50, 3], 4) === 12.75);
