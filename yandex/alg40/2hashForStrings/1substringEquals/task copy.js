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

function prefixSubstringsHashes(str, x = 7, p = 9973) {
	const prefixHashes = new Array(str.length);
	prefixHashes[0] = alphabet[str[0]] % p;
	const X = new Array(str.length + 1);
	X[0] = 1;

	for (let i = 1; i < str.length; i += 1) {
		prefixHashes[i] = (prefixHashes[i - 1] * x + alphabet[str[i]]) % p;
		X[i] = (X[i - 1] * x) % p;
	}
	X[str.length] = (X.at(-1) * x) % p;

	function compareSubstrings(len, from1, from2) {
		const h1 =
			(prefixHashes[from1 + len - 1] + prefixHashes[from2] * X[len - 1]) % p;
		const h2 =
			(prefixHashes[from2 + len - 1] + prefixHashes[from1] * X[len - 1]) % p;
		return h1 === h2 ? 'yes' : 'no';
	}

	return compareSubstrings;
}

async function main() {
	let str = await read();

	str = str.slice(0, -1);
	// parse file string

	const lines = str.split('\n');

	const string = lines[0];

	const compareSubstrings = prefixSubstringsHashes(string);

	const queries = lines
		.slice(2)
		.map((el) => compareSubstrings(...el.split(' ').map(Number)));

	try {
		await fs.writeFile('output.txt', queries.join('\n'));
	} catch (err) {
		console.error(err.message);
	}
}

main();
