/* eslint-disable no-param-reassign */
const { createInterface } = require('readline');

function knightsMove(maxN, maxM, n, m, dp) {
	if (dp === undefined) {
		// dp start filling from 0: 0
		dp = {
			0: { 0: 1 },
			1: { 2: 1 },
			2: { 1: 1 },
		};
	}

	// recursion starts from MaxN MaxM

	if (dp[n] === undefined) {
		dp[n] = {};
	}

	if (dp[n][m] === undefined) {
		const first =
			n - 1 >= 0 && m - 2 >= 0 ? knightsMove(maxN, maxM, n - 1, m - 2, dp) : 0;
		const second =
			n - 1 >= 0 && m - 2 >= 0 ? knightsMove(maxN, maxM, n - 2, m - 1, dp) : 0;
		dp[n][m] = first + second;
	}

	return dp[n][m];
}

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});
rl.once('line', (line) => {
	const [n, m] = line.trim().split(' ').map(Number);

	const res = knightsMove(n - 1, m - 1, n - 1, m - 1);
	console.log(res);
	rl.close();
});
