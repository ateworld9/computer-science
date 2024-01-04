/* eslint-disable no-restricted-syntax */
import * as readline from 'node:readline/promises';

import { stdin, stdout } from 'node:process';
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

(async () => {
	const fileStream = createReadStream('in/1.txt');
	const rl = readline.createInterface({
		input: fileStream,
		// input: stdin,
		output: stdout,
		// crlfDelay: Infinity,
	});

	const str1 = await rl.question('question1\n');
	const [seqLength, reqCtn] = str1.split(' ');

	const str2 = await rl.question('question2\n', (line) => {});
	const seq = str2.split(' ');

	const i = 0;
	for await (const line of rl) {
		console.log('req', line);
		if (i > reqCtn) {
			rl.close();
		}
	}

	console.log(seq, seqLength, reqCtn);

	// rl.close()
})();
