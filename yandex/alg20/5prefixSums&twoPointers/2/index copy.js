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

async function main() {
	let str = await read();
	str = str.slice(0, -1);

	const arr = str.split('\n');
	const nums = arr[1].split(' ').map(Number);
	let curSum = 0;
	let maxSum = 0;
	for (let i = 0; i < nums.length; i++) {
		curSum += nums[i];
		if (curSum > maxSum) maxSum = curSum;

		if (curSum < 0) curSum = 0;
	}

	try {
		await fs.writeFile('output.txt', maxSum.toString());
	} catch (err) {
		console.error(err.message);
	}
}

main();
