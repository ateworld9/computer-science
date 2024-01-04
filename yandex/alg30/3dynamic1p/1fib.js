/* eslint-disable no-param-reassign */
function fib1(n) {
	if (n === 0 || n === 1) {
		return 1;
	}

	return fib1(n - 1) + fib1(n - 2);
}

function fib(n, dp) {
	if (dp === undefined) {
		dp = new Array(n + 1);
		dp[0] = 1;
		dp[1] = 1;
	}
	if (dp[n] === undefined) {
		dp[n] = fib(n - 1, dp) + fib(n - 2, dp);
	}

	return dp[n];
}

function fibCycle(n) {
	const dp = new Array(n + 1);
	dp[0] = 1;
	dp[1] = 1;
	for (let i = 2; i <= n; i += 1) {
		dp[i] = dp[i - 1] + dp[i - 2];
	}

	return dp[n];
}

console.log(fib1(10));
console.log(fib(10));
console.log(fibCycle(10));
