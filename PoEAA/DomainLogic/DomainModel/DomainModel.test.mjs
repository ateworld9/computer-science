import test from 'node:test';
import { Contract, Product } from './DomainModel.mjs';
import assert from 'node:assert';

const word = Product.newWordProcessor('Word');
const excel = Product.newSheets('Excel');
const msSqlServer = Product.newDBMS('MS SQL Server');

const excelContract = new Contract(excel, 10_000_000, '2023-01-01');

excel.calculateRevenueRecognitions(excelContract);

test('Domain model tests', async (t) => {
	t.test('calculate for Sheets', async (t) => {
		excel.calculateRevenueRecognitions(excelContract);

		t.test('recognized, only first date', async (t) => {
			const revenue = excelContract.recognizedRevenue('2023-01-25');
			assert.strictEqual(revenue, 3_333_333.34);
		});
		t.test('all recognized', async (t) => {
			const revenue = excelContract.recognizedRevenue('2024-01-25');
			assert.strictEqual(revenue, 10_000_000);
		});
	});
});
