const persons = [
	['Dmitiy', 'Vahrameev', 'vahrameev.work@gmail.com'],
	['Admin', 'Adminov', 'admin@gmail.com'],
	['Anton', 'Antonov', '3@gmail.com'],
	['Timur', 'Chochiev', 'chochiev@gmail.com'],
	['Ivan', 'Novikov', 'ubah@gmail.com'],
];

export async function initPersonsDB(DB, personsInitData = persons) {
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
			'person_id INTEGER PRIMARY KEY, ' +
			'firstname TEXT NOT NULL, ' +
			'lastname TEXT NOT NULL, ' +
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
		`INSERT INTO person (firstname, lastname, email) VALUES ${personsInitData
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
