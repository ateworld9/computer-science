import {
	ContractsGateway,
	RecognitionsGateway,
	RecognitionsService,
} from './Transaction.mjs';

import { connectDB } from '../../db/db.mjs';
import { initRevenueRecognitionsDB } from '../initRevenueRecognitions.mjs';
import test from 'node:test';
import assert from 'assert';

const connection = await connectDB(
	'./DomainLogic/Transaction/revenue.db',
	initRevenueRecognitionsDB,
	undefined,
	true,
);

const contractsGateway = new ContractsGateway(connection);
const recognitionsGateway = new RecognitionsGateway(connection);
const recognitionsService = new RecognitionsService(
	recognitionsGateway,
	contractsGateway,
);

test('Transaction tests', async (t) => {
	await t.test('calculate for Sheets', async (t) => {
		await recognitionsService.calculateRevenueRecognitions(1);
		await t.test('recognized, only first date', async (t) => {
			const revenue = await recognitionsService.recognizedRevenue(
				1,
				'2023-01-25',
			);
			assert.strictEqual(revenue, 3_333_333.34);
		});
		await t.test('all recognized', async (t) => {
			const revenue = await recognitionsService.recognizedRevenue(
				1,
				'2024-01-25',
			);
			assert.strictEqual(revenue, 10_000_000);
		});
	});

	// const products = await connection.all('SELECT * FROM products');
	// console.log('products', products);
	// const contracts = await connection.all('SELECT * FROM contracts');
	// console.log('contracts', contracts);
	// const revenue_recognitions = await connection.all(
	// 	'SELECT * FROM revenue_recognitions',
	// );
	// console.log('revenue_recognitions', revenue_recognitions);
});
