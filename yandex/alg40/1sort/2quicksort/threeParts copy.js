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
		if (predicate(arr[now]) >= 1) {
			swap(now, greater);
			swap(greater, equal);

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

	return [equal, greater];
}

function getRandomIntInclusive(min, max) {
	// The maximum is inclusive and the minimum is inclusive
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function quicksort(arr, low = 0, high = arr.length - 1) {
	if (low >= high || low < 0) {
		return;
	}

	const random = arr[getRandomIntInclusive(low, high)];

	const [equal, greater] = partitioning(arr, low, high, (x) => random - x);
	quicksort(arr, low, equal - 1);
	quicksort(arr, greater, high);
}

async function main() {
	let str = await read();

	str = str.slice(0, -1);
	// parse file string

	let arr = [];
	const lines = str.split('\n');
	if (lines[1]?.length > 0) {
		arr = lines[1]?.split(' ').map(Number);
		quicksort(arr);
	}
	try {
		await fs.writeFile('output.txt', arr.join(' '));
	} catch (err) {
		console.error(err.message);
	}
}

main();
