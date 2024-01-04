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

function buyTicketsMinimumTime(A, B, C, n, dp) {
	if (dp === undefined) {
		dp = new Array(n + 1);
		dp[0] = A[0];
		dp[1] = Math.min(A[0] + A[1], B[0]);
		dp[2] = Math.min(A[0] + A[1] + A[2], B[0] + A[2], A[0] + B[1], C[0]);
	}

	for (let i = 3; i <= n; i += 1) {
		dp[i] = Math.min(
			dp[i - 1] + A[i],
			dp[i - 2] + B[i - 1],
			dp[i - 3] + C[i - 2],
		);
	}
	// if (dp[n] === undefined) {
	//   dp[n] = Math.min(
	//     buyTicketsMinimumTime(A, B, C, n - 1, dp) + A[n],
	//     buyTicketsMinimumTime(A, B, C, n - 2, dp) + B[n - 1],
	//     buyTicketsMinimumTime(A, B, C, n - 3, dp) + C[n - 2],
	//   );
	// }
	// console.log(dp);

	return dp[n];
}

async function main() {
	let str = await read();

	str = str.slice(0, -1);
	// parse file string

	const lines = str.split('\n');
	const n = +lines[0];
	const A = new Array(n);
	const B = new Array(n);
	const C = new Array(n);
	lines.slice(1).forEach((el, i) => {
		const [a, b, c] = el.split(' ');
		A[i] = Number(a);
		B[i] = Number(b);
		C[i] = Number(c);
	});

	// console.log(A, B, C);

	const res = buyTicketsMinimumTime(A, B, C, n - 1);
	// console.log(res);
	try {
		await fs.writeFile('output.txt', `${res}`);
	} catch (err) {
		console.error(err.message);
	}
}

main();
