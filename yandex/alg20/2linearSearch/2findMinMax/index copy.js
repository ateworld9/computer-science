const fs = require('fs/promises');
const path = require('path');

async function read() {
	try {
		return await fs.readFile(path.join(path.resolve(), 'input.txt'), {
			encoding: 'utf8',
		});
	} catch (err) {
		console.error(err.message);
	}
}
function findMinMax(arr) {
	const temp = {};
	let leftShop = false;
	let rightShop = false;

	const n = arr.length;

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === 2) leftShop = i;
		if (arr[i] === 1 && leftShop !== false) {
			if (temp[i] === undefined) temp[i] = {};
			temp[i].left = i - leftShop;
		}

		if (arr[n - i] === 2) rightShop = n - i;
		if (arr[n - i] === 1 && rightShop !== false) {
			if (temp[n - i] === undefined) temp[n - i] = {};
			temp[n - i].right = rightShop - (n - i);
		}
	}

	const array = [];

	for (const el in temp) {
		console.log(temp[el]);
		const { left, right } = temp[el];
		array.push(left < right ? left : right);
	}

	let result = 0;

	array.forEach((el) => {
		if (el > result) result = el;
	});

	return result;
}

async function main() {
	let str = await read();
	str = str.slice(0, -1);
	// parse file string
	const arr = str.split(' ').map(Number);
	const result = findMinMax(arr);

	try {
		await fs.writeFile('output.txt', result.toString());
	} catch (err) {
		console.error(err.message);
	}
}

main();
