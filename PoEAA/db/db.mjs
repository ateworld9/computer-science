import sqlite3 from 'sqlite3';

sqlite3.verbose();

let db = await new sqlite3.Database('./db/person.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to the person database.');
});

export { db };
