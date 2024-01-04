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

function foo(d, x, y) {
	if (x >= 0 && y >= 0 && x + y <= d) return 0;
	const arr = [x ** 2 + y ** 2, (x - d) ** 2 + y ** 2, x ** 2 + (y - d) ** 2];

	let val = Infinity;
	let res;

	arr.forEach((el, i) => {
		if (el < val) {
			val = el;
			res = i + 1;
		}
	});

	return res;
}

async function main() {
	let str = await read();
	str = str.slice(0, -1);
	// parse file string
	const arr = str.split('\n');
	const d = +arr[0];
	const coords = arr[1].split(' ').map(Number);
	const [x, y] = coords;

	const result = foo(d, x, y);

	try {
		await fs.writeFile('output.txt', result.toString());
	} catch (err) {
		console.error(err.message);
	}
}

main();
