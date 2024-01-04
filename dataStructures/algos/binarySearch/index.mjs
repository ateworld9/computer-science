export function binarySearch(nums, target) {
	let left = 0;
	let right = nums.length - 1;
	while (left <= right) {
		const midIndex = (left + right) >> 1;
		// const midIndex = (left + right) >>> 1;
		// const midIndex = (left + right) / 2; // bug with int overflow
		const mid = nums[midIndex];
		if (mid === target) {
			return midIndex;
		} else if (mid > target) {
			right = midIndex - 1;
		} else {
			left = midIndex + 1;
		}
	}
	return -1;
}
