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

function unique(arr) {
	const set = {};

	for (let i = 0; i < arr.length; i++) {
		if (set[arr[i]]) set[arr[i]] += 1;
		else set[arr[i]] = 1;
	}

	const result = [];
	for (let i = 0; i < arr.length; i += 1) {
		if (set[arr[i]] === 1) result.push(arr[i]);
	}

	return result.join(' ');
}

async function main() {
	let str = await read();
	str = str.slice(0, -1);
	// parse file string
	const arr = str.split(' ');
	const result = unique(arr);

	try {
		await fs.writeFile('output.txt', result);
	} catch (err) {
		console.error(err.message);
	}
}

main();
