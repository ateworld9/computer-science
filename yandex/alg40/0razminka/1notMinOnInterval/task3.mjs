/* eslint-disable no-restricted-syntax */
import * as readline from 'node:readline/promises';

import { stdin, stdout } from 'node:process';
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

const fileStream = createReadStream('in/1.txt');

const rl = readline.createInterface({
	input: fileStream,
	crlfDelay: Infinity,
});

let seqLength = 0;
let reqCtn = 0;
let seq;
rl.once('line', (line) => {
	[seqLength, reqCtn] = line.split(' ');
	rl.resume();
});
rl.pause();
rl.once('line', (line) => {
	seq = line.split(' ');
	rl.resume();
});
rl.pause();
console.log(seq, seqLength, reqCtn);

for await (const line of rl) {
	console.log(line);
}

// rl.close()
