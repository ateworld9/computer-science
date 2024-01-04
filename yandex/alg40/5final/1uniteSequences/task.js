const readline = require('node:readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const bin = (num) => {
	const sequence = [];

	let i = 0;
	let j = 0;
	let ans = 0;
	while (sequence.length <= num) {
		const i2 = i ** 2;
		const j3 = j ** 3;
		if (i2 === j3) {
			sequence.push(i2);
			i += 1;
			j += 1;
			ans += 1;
		} else if (i2 < j3 && i <= num) {
			i += 1;
			ans += 1;
			sequence.push(i2);
		} else {
			j += 1;
			ans += 1;
			sequence.push(j3);
		}
	}

	// console.log(sequence);
	return sequence[num];
};

rl.on('line', (line) => {
	const num = parseInt(line.trim(), 10);
	const res2 = bin(num);
	console.log(res2);
	rl.close();
});
