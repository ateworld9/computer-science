import type { Database } from 'sqlite3';
import sqlite3 from 'sqlite3';

export const connectDB = async (
	filename: string,
	initDbScript?: Function,
	initDbData?: any,
	verbose?: boolean,
) => {
	if (verbose) sqlite3.verbose();

	let db = await new Promise<Database>(function (resolve, reject) {
		const connect = new sqlite3.Database(filename, function (err) {
			if (err) {
				console.error(err.message);
				reject();
			} else {
				console.log('Connected to the database.');
			}
		});
		resolve(connect);
	});

	function run(sql: string, params: any = []) {
		return new Promise<{ id: number; changes: number }>(function (
			resolve,
			reject,
		) {
			const DB = db.run(sql, params, function (err) {
				if (err) {
					// console.log('Error running sql ' + sql);
					// console.log(err);
					reject(err);
				} else {
					resolve({ id: this.lastID, changes: this.changes });
				}
			});
		});
	}

	function get<T>(sql: string, params: any = []) {
		return new Promise<T>(function (resolve, reject) {
			db.get<T>(sql, params, function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	function all<T>(sql: string, params: any = []) {
		return new Promise<T[]>(function (resolve, reject) {
			db.all<T>(sql, params, function (err, rows) {
				if (err) {
					// console.log('Error running sql ' + sql);
					// console.log(err);
					reject(err);
				} else {
					resolve(rows);
				}
			});
		});
	}

	function prepare(sql: string, params = []) {
		return new Promise(function (resolve, reject) {
			const stmt = db.prepare(sql, params, function (err) {
				if (err !== null) {
					reject(err);
				}
			});
			resolve(stmt);
		});
	}

	const DB = {
		get,
		all,
		run,
		prepare,
		serialize: db.serialize.bind(db),
		parallelize: db.parallelize.bind(db),
	};

	if (initDbScript && initDbData) {
		await initDbScript(DB, initDbData);
	} else if (initDbScript) {
		await initDbScript(DB);
	}

	return DB;
};

export type DB = Awaited<ReturnType<typeof connectDB>>;
