import { db } from './db.mjs';

// await db.run('DROP TABLE person;');

await db.run(`
	CREATE TABLE IF NOT EXISTS person (
		contact_id INTEGER PRIMARY KEY,
		first_name TEXT NOT NULL,
		last_name TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE
	);
	`);

const res = await db.run(`
	INSERT INTO person (first_name, last_name, email)
	VALUES 
		('Dmitiy', 'Vahrameev', 'vahrameev.work@gmail.com'),
		('Admin', 'Adminov', 'admin@gmail.com'),
		('Anton', 'Antonov', '3@gmail.com'),
		('Timur', 'Chochiev', 'chochiev@gmail.com'),
		('Ivan', 'Novikov', 'ubah@gmail.com');
`);

console.log(res);

db.all(`SELECT * FROM person;`, [], (err, rows) => {
	if (err) {
		return console.log(err.message);
	}
	console.log(rows);
});

db.close();
