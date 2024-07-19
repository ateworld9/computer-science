import test from 'node:test';
import assert from 'node:assert';

import { Contract, Product } from './DomainModel.js';

const word = Product.newWordProcessor('Word');
const excel = Product.newSheets('Excel');
const msSqlServer = Product.newDBMS('MS SQL Server');

const excelContract = new Contract(excel, 10_000_000, '2023-01-01');

test('Domain model tests', async (t) => {
	await t.test('calculate for Sheets', async (t) => {
		excel.calculateRevenueRecognitions(excelContract);

		await t.test('recognized, only first date', (t) => {
			const revenue = excelContract.recognizedRevenue('2023-01-25');
			assert.strictEqual(revenue, 3_333_333.34);
		});

		await t.test('all recognized', (t) => {
			const revenue = excelContract.recognizedRevenue('2024-01-25');
			assert.strictEqual(revenue, 10_000_000);
		});
	});
});
