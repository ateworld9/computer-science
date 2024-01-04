/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
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

function turtle(matrix) {
	const dp = new Array(matrix.length + 1);
	dp[0] = new Array(matrix[0].length + 1).fill(0);
	for (let i = 1; i < dp.length; i += 1) {
		dp[i] = new Array(matrix[0].length + 1);
		dp[i][0] = 0;
	}

	for (let i = 1; i < dp.length; i += 1) {
		for (let j = 1; j < dp[0].length; j += 1) {
			if (i === 1) {
				dp[i][j] = dp[i][j - 1] + matrix[i - 1][j - 1];
			} else if (j === 1) {
				dp[i][j] = dp[i - 1][j] + matrix[i - 1][j - 1];
			} else {
				dp[i][j] = Math.min(
					dp[i - 1][j] + matrix[i - 1][j - 1],
					dp[i][j - 1] + matrix[i - 1][j - 1],
				);
			}
			// console.table(dp);
		}
	}

	return dp[dp.length - 1][dp[0].length - 1];
}

async function main() {
	let str = await read();

	str = str.slice(0, -1);
	// parse file string

	let lines = str.split('\n');
	const [n, m] = lines[0].split(' ').map(Number);
	lines = lines.slice(1);
	const matrix = lines.map((el) => el.split(' ').map(Number));

	const result = turtle(matrix);

	try {
		await fs.writeFile('output.txt', `${result}`);
	} catch (err) {
		console.error(err.message);
	}
}

main();
