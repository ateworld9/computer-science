import { all, db } from './db.mjs';

db.serialize(function () {
	all('DROP TABLE person;')
		.then((rows) => {
			console.log(rows);
		})
		.catch((err) => {
			console.log('CREATE table', err.message);
		});

	all(
		`
		CREATE TABLE IF NOT EXISTS person (
		person_id INTEGER PRIMARY KEY,
		first_name TEXT NOT NULL,
		last_name TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE
		);
		`,
	)
		.then((rows) => {
			console.log(rows);
		})
		.catch((err) => {
			console.log('CREATE table', err.message);
		});

	all(
		`
		INSERT INTO person (first_name, last_name, email)
		VALUES
		('Dmitiy', 'Vahrameev', 'vahrameev.work@gmail.com'),
		('Admin', 'Adminov', 'admin@gmail.com'),
		('Anton', 'Antonov', '3@gmail.com'),
		('Timur', 'Chochiev', 'chochiev@gmail.com'),
		('Ivan', 'Novikov', 'ubah@gmail.com');
		`,
	)
		.then((rows) => {
			console.log(rows);
		})
		.catch((err) => {
			console.log('insert to person', err.message);
		});

	all('SELECT * FROM person;')
		.then((rows) => {
			console.log(rows);
		})
		.catch((err) => {
			console.log('select in', err.message);
		});
});
