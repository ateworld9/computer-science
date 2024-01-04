const fs = require('fs/promises');
const path = require('path');

async function read(filename = 'input.txt') {
	try {
		return await fs.readFile(path.join(path.resolve(), filename), {
			encoding: 'utf8',
		});
	} catch (err) {
		console.error(err.message);
	}
}

async function main() {
	let str = await read();
	str = str.slice(0, -1);
	const result = [];
	let votesSum = 0;
	const parties = str.split('\n').map((el, i) => {
		const party = el.split(' ');
		const votes = Number(party.pop());
		votesSum += votes;
		return [i, party.join(' '), votes];
	});
	const first = votesSum / 450;
	let free = 450;
	for (let i = 0; i < parties.length; i += 1) {
		const party = parties[i];
		party.push(Math.floor(party[2] / first));
		free -= Math.floor(party[2] / first);
		party.push(party[2] % first);
	}

	parties.sort((a, b) => b[4] - a[4]);

	for (let i = 0; i < free; i += 1) parties[i][3] += 1;
	parties.sort((a, b) => a[0] - b[0]);

	parties.forEach((el) => {
		result.push(`${el[1]} ${el[3]}`);
	});

	try {
		await fs.writeFile('output.txt', result.join('\n'));
	} catch (err) {
		console.error(err.message);
	}
}

main();
