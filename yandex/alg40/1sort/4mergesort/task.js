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

function mergesort(arr) {
	if (arr.length < 2) {
		return arr;
	}

	const middle = Math.floor(arr.length / 2);

	const a = mergesort(arr.slice(0, middle));
	const b = mergesort(arr.slice(middle));

	return mergeSortedSequences(a, b);
}

async function main() {
	let str = await read();

	str = str.slice(0, -1);
	// parse file string

	const lines = str.split('\n');
	const arr = lines[1] === '' ? [] : lines[1]?.split(' ').map(Number);
	// console.log(arr, Math.floor(Math.floor(arr.length / 2) / 2));
	// console.log(arr);
	const result = mergesort(arr);
	// console.log(result);

	try {
		await fs.writeFile('output.txt', result.join(' '));
	} catch (err) {
		console.error(err.message);
	}
}

main();
