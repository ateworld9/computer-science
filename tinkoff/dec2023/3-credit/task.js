const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const lines = [];
rl.on('line', (line) => {
	lines.push(line.trim().split(' ').map(Number));
});

function maxMoneyAfterShopping(m, gifts) {
	let remainingMoney = m;

	for (let i = 0; i < gifts.length; i++) {
		const giftCost = gifts[i];

		if (giftCost <= remainingMoney) {
			remainingMoney = Math.max(remainingMoney, m - giftCost);
		}
	}

	return remainingMoney;
}

rl.on('close', () => {});
