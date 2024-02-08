import assert from 'assert';
import invoices from './invoices.mjs';
import plays from './plays.mjs';
import test from 'node:test';

function createStatementData(invoice, plays) {
	function playFor(aPerformance) {
		return plays[aPerformance.playID];
	}
	function amountFor(aPerformance) {
		let resultAmount = 0;
		switch (aPerformance.play.type) {
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
				throw new Error(`unknown type: ${aPerformance.play.type}`);
		}
		return resultAmount;
	}
	function volumeCreditsFor(aPerformance) {
		let result = 0;
		// Добавление бонусов
		result += Math.max(aPerformance.audience - 30, 0);
		// Дополнительный бонус за каждые 10 комедий
		if (aPerformance.play.type === 'comedy')
			result += Math.floor(aPerformance.audience / 5);
		return result;
	}
	function totalAmount(data) {
		return data.performances.reduce((total, p) => total + p.amount, 0);
	}
	function totalVolumeCredits(data) {
		return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
	}

	function enrichPerformance(aPerformance) {
		const result = Object.assign({}, aPerformance);
		result.play = playFor(result);
		result.amount = amountFor(result);
		result.volumeCredits = volumeCreditsFor(result);
		return result;
	}
	const statementData = {};
	statementData.customer = invoice.customer;
	statementData.performances = invoice.performances.map(enrichPerformance);
	statementData.totalAmount = totalAmount(statementData);
	statementData.totalVolumeCredits = totalVolumeCredits(statementData);
	return statementData;
}

function usd(aNumber) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	}).format(aNumber / 100);
}

function renderPlainText(data) {
	let result = `Statement for ${data.customer}\n`;
	for (let performance of data.performances) {
		result += ` ${performance.play.name}: ${usd(performance.amount)}`;
		result += ` (${performance.audience} seats)\n`;
	}
	result += `Amount owed is ${usd(data.totalAmount)}\n`;
	result += `You earned ${data.totalVolumeCredits} credits\n`;
	return result;
}

function renderHtml(data) {
	let result = `<h1>Statement for ${data.customer}</h1>`;
	result += '<table>\n';
	result += '<tr><th>play</th><th>seats</th><th>cost</th></tr>\n';
	for (let performance of data.performances) {
		result += '<tr>';
		result += `<td>${performance.play.name}</td>`;
		result += `<td>${usd(performance.amount)}</td>`;
		result += `<td>${performance.audience}</td>`;
		result += '</tr>\n';
	}
	result += '</table>\n';
	result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
	result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
	return result;
}

function statement(invoice, plays) {
	return renderPlainText(createStatementData(invoice, plays));
}
function htmlStatement(invoice, plays) {
	return renderHtml(createStatementData(invoice, plays));
}

console.log(htmlStatement(invoices[0], plays));

test('test statement', () => {
	assert.strictEqual(
		statement(invoices[0], plays),
		`Statement for BigCo\n Hamlet: $650.00 (55 seats)\n As You Like It: $475.00 (35 seats)\n Othello: $500.00 (40 seats)\nAmount owed is $1,625.00\nYou earned 47 credits\n`,
	);
});
