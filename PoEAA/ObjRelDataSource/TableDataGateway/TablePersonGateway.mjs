import { SQLException } from '../../errors/SQLException.mjs';

export class PersonGateway {
	constructor(connection) {
		this.connection = connection;
	}
	async findAll() {
		const sql = 'SELECT person_id, firstname, lastname, email FROM person';
		let DBPersons;
		try {
			DBPersons = await this.connection.all(sql);
		} catch (error) {
			throw new SQLException(error.message, sql);
		}
		return DBPersons;
	}

	async findWhere(whereClause) {
		const sql = `SELECT person_id, firstname, lastname, email FROM person WHERE ${whereClause}`;
		let DBPersons;
		try {
			DBPersons = await this.connection.all(sql);
		} catch (error) {
			throw new SQLException(error.message, sql);
		}
		return DBPersons;
	}

	async findByLastname(name) {
		const sql =
			'SELECT person_id, firstname, lastname, email FROM person WHERE person.lastname = $lastname';
		let DBPersons;
		try {
			DBPersons = await this.connection.all(sql, { $lastname: name });
		} catch (error) {
			throw new SQLException(error.message, sql);
		}
		return DBPersons;
	}

	async findById(id) {
		const sql =
			'SELECT person_id, firstname, lastname, email FROM person WHERE person_id = $id';
		let DBPerson;
		try {
			DBPerson = await this.connection.get(sql, { $id: id });
		} catch (error) {
			throw new SQLException(error.message, sql);
		}
		return DBPerson;
	}

	async insert(firstname, lastname, email) {
		const sql =
			'INSERT INTO person (firstname, lastname, email) VALUES ($firstname, $lastname, $email) RETURNING *';
		let DBPerson;
		try {
			DBPerson = await this.connection.all(sql, {
				$firstname: firstname,
				$lastname: lastname,
				$email: email,
			});
		} catch (error) {
			throw new SQLException(error.message, sql);
		}
		return DBPerson;
	}

	async update(id, firstname, lastname, email) {
		const sql =
			'UPDATE person SET ' +
			'firstname = $firstname, ' +
			'lastname = $lastname, ' +
			'email = $email ' +
			'WHERE person_id = $id ';
		try {
			await this.connection.all(sql, {
				$firstname: firstname,
				$lastname: lastname,
				$email: email,
				$id: id,
			});
		} catch (error) {
			throw new SQLException(error.message, sql);
		}
	}

	async delete(id) {
		const sql = 'DELETE FROM person WHERE person_id = $id';
		try {
			return await this.connection.run(sql, { $id: id });
		} catch (error) {
			throw new SQLException(error.message, sql);
		}
	}
}
