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

function guess(max, arrs) {
	let yes = new Set();

	for (let i = 1; i <= max; i++) yes.add(i);

	for (let i = 0; i < arrs.length; i += 2) {
		const arr = arrs[i].split(' ').map(Number);
		const resp = arrs[i + 1];
		if (resp === 'YES') {
			const temp = [];
			for (let i = 0; i < arr.length; i++) {
				if (yes.has(arr[i])) temp.push(arr[i]);
			}
			yes = new Set(temp);
		}

		if (resp === 'NO') {
			for (let j = 0; j < arr.length; j += 1) yes.delete(arr[j]);
		}
	}
	return Array.from(yes);
}

async function main() {
	let str = await read();
	str = str.slice(0, -1);
	// parse file string
	const arrs = str.split('\n');
	arrs.pop();
	const maxNumber = +arrs.shift();
	const result = guess(maxNumber, arrs);

	try {
		await fs.writeFile('output.txt', result.join(' '));
	} catch (err) {
		console.error(err.message);
	}
}

main();
