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

function checkDate(x, y, z) {
	const isValidEuropean = x <= 31 && y <= 12;
	const isValidAmerican = x <= 12 && y <= 31;
	if (isValidEuropean && isValidAmerican) {
		if (x === y) return 1;
		else return 0;
	} else if (isValidEuropean || isValidAmerican) {
		return 1;
	} else {
		return 0;
	}
}

async function main() {
	let str = await read();
	str = str.slice(0, -1);
	// parse file string
	const arr = str.split(' ').map(Number);
	const result = checkDate(...arr);

	try {
		await fs.writeFile('output.txt', result.toString());
	} catch (err) {
		console.error(err.message);
	}
}

main();
