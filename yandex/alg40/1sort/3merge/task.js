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

function mergeSortedSequences(seq1, seq2) {
	const result = new Array(seq1.length + seq2.length);
	// const result = []
	let i = 0;
	let j = 0;

	for (let k = 0; k < result.length; k += 1) {
		if ((i !== seq1.length && j === seq2.length) || seq1[i] <= seq2[j]) {
			result[k] = seq1[i];
			i += 1;
		} else {
			result[k] = seq2[j];
			j += 1;
		}
	}

	return result;
}

async function main() {
	let str = await read();

	str = str.slice(0, -1);
	// parse file string

	const lines = str.split('\n');
	const arr1 = lines[1] === '' ? [] : lines[1].split(' ').map(Number);
	const arr2 = lines[3] === '' ? [] : lines[3].split(' ').map(Number);

	const res = mergeSortedSequences(arr1, arr2);

	try {
		await fs.writeFile('output.txt', res.join(' '));
	} catch (err) {
		console.error(err.message);
	}
}

main();
