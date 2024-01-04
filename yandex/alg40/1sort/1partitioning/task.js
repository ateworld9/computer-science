/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable for-direction */
const fs = require('node:fs/promises');
const path = require('node:path');

async function read(filename = 'input.txt') {
	try {
		return await fs.readFile(path.join(path.resolve(), filename), {
			encoding: 'utf8',
		});
	} catch (err) {
		console.error(err.message);
		return -1;
	}
}

function swap(arr, i, j) {
	const toSwap = arr[i];
	arr[i] = arr[j];
	arr[j] = toSwap;
}

function partitioning(arr, low, high, predicate) {
	let equal = low;
	let greater = low;
	let now = low;

	while (now <= high) {
		// console.log(arr[now], predicate);
		if (predicate(arr[now]) >= 1) {
			// swap(arr, now, equal);
			// swap(arr, now, greater);
			const toSwap = arr[now];
			arr[now] = arr[greater];
			arr[greater] = arr[equal];
			arr[equal] = toSwap;

			equal += 1;
			greater += 1;
			now += 1;
		}
		if (predicate(arr[now]) === 0) {
			swap(arr, now, greater);
			greater += 1;
			now += 1;
		}
		if (predicate(arr[now]) <= -1) {
			now += 1;
		}
	}

	return equal;
}

async function main() {
	let str = await read();

	str = str.slice(0, -1);
	// parse file string

	const lines = str.split('\n');
	const arr = lines[1] === '' ? [] : lines[1].split(' ').map(Number);
	// console.log(arr, +lines[2]);
	const result = partitioning(
		arr,
		0,
		arr.length - 1,
		(x) => Number(lines[2]) - x,
	);
	try {
		await fs.writeFile('output.txt', `${result}\n${arr.length - result}`);
	} catch (err) {
		console.error(err.message);
	}
}

main();
