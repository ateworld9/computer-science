import sqlite3 from 'sqlite3';

sqlite3.verbose();

let db = new sqlite3.Database('./db/person.db', function (err) {
	if (err) {
		console.error(err.message);
	} else {
		console.log('Connected to the person database.');
	}
});

function get(sql, params = []) {
	return new Promise(function (resolve, reject) {
		db.get(sql, params, function (err, result) {
			if (err) {
				console.log('Error running sql: ' + sql);
				console.log(err);
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}

function run(sql, params = []) {
	return new Promise(function (resolve, reject) {
		db.run(sql, params, function (err) {
			if (err) {
				console.log('Error running sql ' + sql);
				console.log(err);
				reject(err);
			} else {
				resolve({ id: this.lastID });
			}
		});
	});
}

function all(sql, params = []) {
	return new Promise(function (resolve, reject) {
		db.all(sql, params, function (err, rows) {
			if (err) {
				console.log('Error running sql: ' + sql);
				console.log(err);
				reject(err);
			} else {
				resolve(rows);
			}
		});
	});
}

export { db, all, get, run };
