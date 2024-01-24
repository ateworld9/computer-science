import { SQLException } from '../../errors/SQLException.mjs';

export class Person {
	constructor(personId, firstname, lastname, email, connection) {
		this.personId = personId;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;

		this.connection = connection;
	}

	static async findAll(Registry) {
		const sql = 'SELECT person_id, firstname, lastname, email FROM person';

		let personRows;
		try {
			personRows = await this.connection.all(sql);
		} catch (error) {
			throw new SQLException(error.message, sql);
		}
		const persons = personRows.map((personDB) =>
			Person.load(personDB, Registry),
		);
		return persons;
	}
	static async findById(id, Registry) {
		const sql =
			'SELECT person_id, firstname, lastname, email FROM person WHERE person_id = $id';
		let result;
		if (Registry) {
			result = Registry.getPerson(id);
		}
		if (result !== undefined) {
			return result;
		}
		let personDB;
		try {
			personDB = await this.connection.get(sql, { $id: id });
		} catch (error) {
			throw new SQLException(error.message, sql);
		}
		if (personDB === undefined) {
			return undefined;
		}
		const person = Person.load(personDB, Registry);
		return person;
	}
	// Adapter from DBperson to Person
	static load(DBperson, Registry) {
		let result = Registry?.getPerson(DBperson.person_id) ?? undefined;
		if (result !== undefined) {
			return result;
		}
		result = new Person(
			DBperson.person_id,
			DBperson.firstname,
			DBperson.lastname,
			DBperson.email,
		);
		Registry?.addPerson(result);
		return result;
	}

	async insert(Registry) {
		const sql =
			'INSERT INTO person (firstname, lastname, email) VALUES ($firstname, $lastname, $email) RETURNING *';
		let resultSet;
		try {
			resultSet = await this.connection.all(sql, {
				$firstname: this.firstname,
				$lastname: this.lastname,
				$email: this.email,
			});
		} catch (error) {
			throw new SQLException(error.message, sql);
		}
		this.personId = resultSet[0].person_id;
		Registry?.addPerson(this.personId, this);
		return this;
	}

	async update() {
		const sql =
			'UPDATE person SET ' +
			'firstname = $firstname, ' +
			'lastname = $lastname, ' +
			'email = $email ' +
			'WHERE person_id = $id ';
		try {
			const result = await this.connection.run(sql, {
				$firstname: this.firstname,
				$lastname: this.lastname,
				$email: this.email,
				$id: this.personId,
			});
			return result;
		} catch (error) {
			throw new SQLException(error.message, sql);
		}
	}

	async delete(Registry) {
		const sql = 'DELETE FROM person WHERE person_id = $id';
		try {
			await this.connection.run(sql, { $id: this.personId });
			Registry?.deletePerson(this.personId);
		} catch (error) {
			throw new SQLException(error.message, sql);
		}
	}
}
