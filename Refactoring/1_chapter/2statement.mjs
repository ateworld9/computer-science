import assert from 'assert';
import invoices from './invoices.mjs';
import plays from './plays.mjs';
import test from 'node:test';

function statement(invoice, plays) {
	function usd(aNumber) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
		}).format(aNumber / 100);
	}
	function playFor(aPerformance) {
		return plays[aPerformance.playID];
	}
	function amountFor(aPerformance) {
		let resultAmount = 0;
		switch (playFor(aPerformance).type) {
			case 'tragedy':
				resultAmount = 40000;
				if (aPerformance.audience > 30)
					resultAmount += 1000 * (aPerformance.audience - 30);
				break;
			case 'comedy':
				resultAmount = 30000;
				if (aPerformance.audience > 20)
					resultAmount += 10000 + 500 * (aPerformance.audience - 20);
				break;
			default:
				throw new Error(`unknown type: ${playFor(aPerformance).type}`);
		}
		return resultAmount;
	}
	function volumeCreditsFor(aPerformance) {
		let result = 0;
		// Добавление бонусов
		result += Math.max(aPerformance.audience - 30, 0);
		// Дополнительный бонус за каждые 10 комедий
		if (playFor(aPerformance).type === 'comedy')
			result += Math.floor(aPerformance.audience / 5);
		return result;
	}
	function totalVolumeCredits() {
		let volumeCredits = 0;
		for (let performance of invoice.performances) {
			volumeCredits += volumeCreditsFor(performance);
		}
		return volumeCredits;
	}
	function totalAmount() {
		result = 0;
		for (let performance of invoice.performances) {
			result += amountFor(performance);
		}
		return result;
	}

	let result = `Statement for ${invoice.customer}\n`;
	for (let performance of invoice.performances) {
		result += ` ${playFor(performance).name}: ${usd(amountFor(performance))}`;
		result += ` (${performance.audience} seats)\n`;
	}
	result += `Amount owed is ${usd(totalAmount())}\n`;
	result += `You earned ${totalVolumeCredits()} credits\n`;
	return result;
}

// console.log(statement(invoices[0], plays));

test('test statement', () => {
	assert.strictEqual(
		statement(invoices[0], plays),
		`Statement for BigCo\n Hamlet: $650.00 (55 seats)\n As You Like It: $475.00 (35 seats)\n Othello: $500.00 (40 seats)\nAmount owed is $1,625.00\nYou earned 47 credits\n`,
	);
});
