'use strict';

const { readFile } = require('node:fs/promises');

(async () => {
	try {
		const file1 = await readFile('1-prototype.js');
		const file2 = await readFile('2-sync.j').catch((err) => {
			console.log('Promise...catch');
			console.error(err);
			return readFile('2-sync.js');
		});
		const file3 = await readFile('3-async.j');
		console.dir([file1.length, file2.length, file3.length]);
	} catch (err) {
		console.log('try...catch');
		console.error(err);
	}
})();
