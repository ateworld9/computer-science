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

function findBiggestSquare(matrix) {}

async function main() {
	let str = await read();

	str = str.slice(4, -1);
	// parse file string

	const lines = str.split('\n').map((el) => el.split(' ').map(Number));
	console.log(lines);
	try {
		await fs.writeFile('output.txt', '');
	} catch (err) {
		console.error(err.message);
	}
}

main();
