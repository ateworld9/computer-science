import { DB } from '../db/db.js';

export async function initRevenueRecognitionsDB(DB: DB, InitData: any) {
	// DB.serialize(function () {
	await DB.run('DROP TABLE IF EXISTS revenue_recognitions;')
		.then(() => {
			console.log('table revenue_recognitions dropped');
		})
		.catch((err) => {
			console.log('ERR DROP table revenue_recognitions', err.message);
		});

	await DB.run('DROP TABLE IF EXISTS contracts;')
		.then(() => {
			console.log('table contracts dropped');
		})
		.catch((err) => {
			console.log('ERR DROP table contracts', err.message);
		});

	await DB.run('DROP TABLE IF EXISTS products;')
		.then(() => {
			console.log('table products dropped');
		})
		.catch((err) => {
			console.log('ERR DROP table products', err.message);
		});

	await DB.run(
		'CREATE TABLE IF NOT EXISTS products (' +
			'product_id INTEGER PRIMARY KEY, ' +
			'name TEXT NOT NULL, ' +
			'type TEXT NOT NULL ' +
			')',
	)
		.then(() => {
			console.log('table products created');
		})
		.catch((err) => {
			console.log('ERR CREATE table products', err.message);
		});

	await DB.all(
		'INSERT INTO products (name, type) VALUES ' +
			"('Excel', 'Sheets'), " +
			"('Word', 'WordProcessor'), " +
			"('MS SQL Server', 'DBMS') ",
	)
		.then(() => {
			console.log('table products filled');
		})
		.catch((err) => {
			console.log('ERR INSERT products', err.message);
		});

	await DB.all(
		'CREATE TABLE IF NOT EXISTS contracts (' +
			'contract_id INTEGER PRIMARY KEY, ' +
			'product_id INTEGER, ' +
			'revenue DECIMAL, ' +
			'date_signed DATE' +
			')',
	)
		.then(() => {
			console.log('table contracts created');
		})
		.catch((err) => {
			console.log('ERR CREATE contracts table', err.message);
		});
	await DB.all(
		'INSERT INTO contracts (product_id, revenue, date_signed) VALUES ' +
			"(1, 10000000, '2023-01-01'), " +
			"(2, 1000000, '2023-05-01'), " +
			"(3, 10000000, '2023-09-01') ",
	)
		.then(() => {
			console.log('table contracts filled');
		})
		.catch((err) => {
			console.log('ERR INSERT contracts', err.message);
		});

	await DB.all(
		'CREATE TABLE IF NOT EXISTS revenue_recognitions (' +
			'contract_id INTEGER, ' +
			'amount INTEGER, ' +
			'recognized_on DATE, ' +
			'PRIMARY KEY (contract_id, recognized_on)' +
			')',
	)
		.then(() => {
			console.log('table revenue_recognitions created');
		})
		.catch((err) => {
			console.log('ERR CREATE table revenue_recognitions ', err.message);
		});
}
