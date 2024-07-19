import { SQLException } from '../../errors/SQLException.js';
import { DB } from '../../db/db.js';
import { SQLPersonI } from '../Person.interface.js';

export class PersonGateway {
	connection: DB;
	constructor(connection: DB) {
		this.connection = connection;
	}
	async findAll() {
		const sql = 'SELECT id, firstname, lastname, email FROM person';
		let DBPersons;
		try {
			DBPersons = await this.connection.all<SQLPersonI>(sql);
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}
		return DBPersons;
	}

	async findWhere(whereClause: string) {
		const sql = `SELECT id, firstname, lastname, email FROM person WHERE ${whereClause}`;
		let DBPersons;
		try {
			DBPersons = await this.connection.all<SQLPersonI>(sql);
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}
		return DBPersons;
	}

	async findByLastname(name: string) {
		const sql =
			'SELECT id, firstname, lastname, email FROM person WHERE person.lastname = $lastname';
		let DBPersons;
		try {
			DBPersons = await this.connection.all<SQLPersonI>(sql, {
				$lastname: name,
			});
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}
		return DBPersons;
	}

	async findById(id: number) {
		const sql =
			'SELECT id, firstname, lastname, email FROM person WHERE id = $id';
		let DBPerson;
		try {
			DBPerson = await this.connection.get<SQLPersonI>(sql, { $id: id });
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}
		return DBPerson;
	}

	async insert(firstname: string, lastname: string, email: string) {
		const sql =
			'INSERT INTO person (firstname, lastname, email) VALUES ($firstname, $lastname, $email) RETURNING *';
		let DBPerson;
		try {
			DBPerson = await this.connection.all<SQLPersonI>(sql, {
				$firstname: firstname,
				$lastname: lastname,
				$email: email,
			});
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}
		return DBPerson;
	}

	async update(id: number, firstname: string, lastname: string, email: string) {
		const sql =
			'UPDATE person SET ' +
			'firstname = $firstname, ' +
			'lastname = $lastname, ' +
			'email = $email ' +
			'WHERE id = $id ';
		try {
			const result = await this.connection.run(sql, {
				$firstname: firstname,
				$lastname: lastname,
				$email: email,
				$id: id,
			});

			if (result.changes === 0) {
				throw new SQLException('Update is not success', sql);
			}
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}
	}

	async delete(id: number) {
		const sql = 'DELETE FROM person WHERE id = $id';
		try {
			return await this.connection.run(sql, { $id: id });
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}
	}
}
