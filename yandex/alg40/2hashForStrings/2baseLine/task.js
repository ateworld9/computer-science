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

function computePrefix(pattern) {
	const pi = new Array(pattern.length).fill(0);
	let j = 0;
	for (let i = 1; i < pattern.length; i += 1) {
		while (j > 0 && pattern[j] !== pattern[i]) {
			j = pi[j - 1];
		}
		if (pattern[j] === pattern[i]) {
			j += 1;
		}
		pi[i] = j;
	}
	return pi;
}

function baseLineLength(str) {
	const pi = computePrefix(str);
	return str.length - pi.at(-1);
}

async function main() {
	let str = await read();

	str = str.slice(0, -1);
	// parse file string

	const len = baseLineLength(str);
	try {
		await fs.writeFile('output.txt', len.toString());
	} catch (err) {
		console.error(err.message);
	}
}

main();
