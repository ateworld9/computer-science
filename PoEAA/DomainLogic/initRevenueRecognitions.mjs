export async function initPersonsDB(DB, InitData) {
	// DB.serialize(function () {
	await DB.all('DROP TABLE IF EXISTS person;')
		.then(() => {
			console.log('table person dropped');
		})
		.catch((err) => {
			console.log('DROP table', err.message);
		});

	await DB.all(
		'CREATE TABLE IF NOT EXISTS products (' +
			'product_id INTEGER PRIMARY KEY, ' +
			'name TEXT NOT NULL, ' +
			'type TEXT NOT NULL, ' +
			')',
	)
		.then(() => {
			console.log('table products created');
		})
		.catch((err) => {
			console.log('CREATE table products', err.message);
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
			console.log('CREATE table', err.message);
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
			console.log('table contracts created');
		})
		.catch((err) => {
			console.log('CREATE table', err.message);
		});

	await DB.all(
		`INSERT INTO person (firstname, lastname, email) VALUES ${InitData.map(
			(row) => `(${row.map((col) => `'${col}'`).join(', ')})`,
		).join(', ')}`,
	)
		.then(() => {
			console.log('table person filled');
		})
		.catch((err) => {
			console.log('INSERT INTO person', err.message);
		});
	// });
}
