/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
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
let PHASE = 1;
const RESULT = ['Initial array:'];

function countingsort(arr, digit) {
	const map = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	const map2 = [[], [], [], [], [], [], [], [], [], []];
	arr.forEach((el) => {
		map[el[digit]] += 1;
		map2[el[digit]].push(el);
	});
	let i = 0;
	for (let b = 0; b < map.length; b += 1) {
		RESULT.push(`Bucket ${b}: ${map[b] === 0 ? 'empty' : map2[b].join(', ')}`);
		const temp = map[b];
		map[b] = i;
		i += temp;
	}

	const result = new Array(arr.length);
	for (let j = 0; j < arr.length; j += 1) {
		result[map[arr[j][digit]]] = arr[j];
		map[arr[j][digit]] += 1;
	}

	return result;
}

function radixsort(arr) {
	// Radix LSD(List Significant Digit)
	let digit = arr[0].length - 1;
	while (digit >= 0) {
		RESULT.push('**********');
		RESULT.push(`Phase ${PHASE}`);
		PHASE += 1;
		arr = countingsort(arr, digit);
		digit -= 1;
	}

	return arr;
}

async function main() {
	let str = await read();

	str = str.slice(0, -1);
	// parse file string

	const lines = str.split('\n');
	const arr = lines.slice(1);
	RESULT.push(arr.join(', '));

	const result = radixsort(arr);

	RESULT.push('**********');
	RESULT.push('Sorted array:');
	RESULT.push(result.join(', '));

	try {
		await fs.writeFile('output.txt', RESULT.join('\n'));
	} catch (err) {
		console.error(err.message);
	}
}

main();
