/* eslint-disable no-shadow */
const a = [3, 2, 1];
const b = [5, 4, 2];

function calcPolynom(a, x) {
	let res = 0;
	const n = a.length;

	for (let i = 0; i < n; i += 1) {
		res = res * x + a[i];
	}
	return res;
}

console.log(calcPolynom(a, 3));

function hashPolynom(a, x, p = 100) {
	let res = 0;

	for (let i = 0; i < a.length; i += 1) {
		res = (res * x + a[i]) % p;
	}
	return res;
}
