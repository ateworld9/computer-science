/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
/* eslint-disable no-restricted-syntax */

import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import { createReadStream } from 'node:fs';

const fileStream = createReadStream('in/1.txt');

const rl = createInterface({
	input: fileStream,
	output: stdout,
	crlfDelay: Infinity,
});

let seqLength = 0;
let reqCtn = 0;
let seq;
let i = 1;

for await (const line of rl) {
	switch (i) {
		case 1:
			[seqLength, reqCtn] = line.split(' ').map(Number);
			break;
		case 2:
			seq = line.split(' ').map(Number);
			break;
		default:
			const [l, r] = line.split(' ').map(Number);
			let min = seq[l];
			let other;
			for (let j = l + 1; j <= r; j += 1) {
				if (seq[j] < min) {
					min = seq[j];
				}
				if (seq[j] > min) {
					other = seq[j];
				}
			}
			if (other > min) {
				console.log(other);
			} else {
				console.log('NOT FOUND');
			}
	}
	i += 1;
}

// console.log(seq, seqLength, reqCtn);

rl.close();
