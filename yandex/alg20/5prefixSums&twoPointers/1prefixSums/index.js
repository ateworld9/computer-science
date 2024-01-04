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

function rangeSumQuery(prefixSum, l, r) {
	return prefixSum[r] - prefixSum[l];
}

async function main() {
	let str = await read();
	str = str.slice(0, -1);

	const arr = str.split('\n');
	const nums = arr[1].split(' ').map(Number);
	const prefixSums = makePrefixSums(nums);

	const result = [];
	for (let i = 2; i < arr.length; i += 1) {
		const rl = arr[i].split(' ');
		result.push(rangeSumQuery(prefixSums, rl[0] - 1, rl[1]));
	}

	try {
		await fs.writeFile('output.txt', result.join('\n'));
	} catch (err) {
		console.error(err.message);
	}
}

main();
