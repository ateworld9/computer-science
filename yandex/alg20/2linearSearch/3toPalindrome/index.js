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

function charToPalindrome(str) {
	let counter = 0;

	for (let i = 0; i < Math.floor(str.length / 2); i += 1) {
		if (str[i] !== str[str.length - i]) counter++;
	}

	return counter;
}

async function main() {
	let str = await read();
	str = str.slice(0, -1);

	const result = charToPalindrome(str);

	try {
		await fs.writeFile('output.txt', `${result}\n`);
	} catch (err) {
		console.error(err.message);
	}
}

main();
