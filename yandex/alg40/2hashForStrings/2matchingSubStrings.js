const alphabet = {
	a: 1,
	b: 2,
	c: 3,
	d: 4,
	e: 5,
	f: 6,
	g: 7,
	h: 8,
	i: 9,
	j: 10,
	k: 11,
	l: 12,
	m: 13,
	n: 14,
	o: 15,
	p: 16,
	q: 17,
	r: 18,
	s: 19,
	t: 20,
	u: 21,
	v: 22,
	w: 23,
	x: 24,
	y: 25,
	z: 26,
};
function compareSubstrings(str, x = 10) {
	const coefficents = new Array(str.length + 1);
	coefficents[0] = 0;
	const hashes = new Array(str.length + 1);
	hashes[0] = 0;

	for (let i = 1; i <= str.length; i += 1) {
		coefficents[i] = alphabet[str[i]];
		hashes[i] = hashes[i - 1] * x + coefficents[i];
	}
}

function hashPolynom(a, x, p = 100) {
	let res = 0;

	for (let i = 0; i < a.length; i += 1) {
		res = (res * x + a[i]) % p;
	}
	return res;
}
