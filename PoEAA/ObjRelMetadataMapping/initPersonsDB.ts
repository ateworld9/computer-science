import { DB } from '../db/db.js';

const persons = [
	['Dmitriy', 'Vahrameev', 'vahrameev.work@gmail.com'],
	['Admin', 'Adminov', 'admin@gmail.com'],
	['Anton', 'Antonov', '3@gmail.com'],
	['Timur', 'Chochiev', 'chochiev@gmail.com'],
	['Ivan', 'Novikov', 'ubah@gmail.com'],
];

export async function initPersonsDB(DB: DB, personsInitData = persons) {
	// DB.serialize(function () {
	await DB.all('DROP TABLE IF EXISTS person;')
		.then(() => {
			console.log('table person dropped');
		})
		.catch((err) => {
			console.log('DROP table', err.message);
		});

	await DB.all(
		'CREATE TABLE IF NOT EXISTS person (' +
			'id INTEGER PRIMARY KEY, ' +
			'first_name TEXT NOT NULL, ' +
			'last_name TEXT NOT NULL, ' +
			'email TEXT NOT NULL UNIQUE' +
			')',
	)
		.then(() => {
			console.log('table person created');
		})
		.catch((err) => {
			console.log('CREATE table', err.message);
		});

	await DB.all(
		`INSERT INTO person (first_name, last_name, email) VALUES ${personsInitData
			.map((person) => `(${person.map((el) => `'${el}'`).join(', ')})`)
			.join(', ')}`,
	)
		.then(() => {
			console.log('table person filled');
		})
		.catch((err) => {
			console.log('INSERT INTO person', err.message);
		});
	// });
}
