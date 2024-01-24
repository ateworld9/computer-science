import { SQLException } from '../../errors/SQLException.mjs';

export class PersonFinder {
	constructor(connection, registry) {
		this.connection = connection;
		this.registry = registry;
	}
	async findAll() {
		const sql = 'SELECT person_id, firstname, lastname, email FROM person';

		let personRows;
		try {
			personRows = await this.connection.all(sql);
		} catch (error) {
			throw new SQLException(error.message, sql);
		}
		const persons = personRows.map((personDB) =>
			PersonGateway.load(personDB, this.connection, this.registry),
		);
		return persons;
	}

	async findById(id) {
		const sql =
			'SELECT person_id, firstname, lastname, email FROM person WHERE person_id = $id';
		let result;
		if (this.registry) {
			result = this.registry.getPerson(id);
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
		const person = PersonGateway.load(personDB, this.connection, this.registry);
		return person;
	}
}

export class PersonGateway {
	constructor(personId, firstname, lastname, email, connection, registry) {
		this.personId = personId;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.connection = connection;
		this.registry = registry;
	}

	// Adapter from DBperson to PersonGateway Row
	static load(DBperson, connection, registry) {
		let result = registry?.getPerson(DBperson.person_id) ?? undefined;
		if (result !== undefined) {
			return result;
		}
		result = new PersonGateway(
			DBperson.person_id,
			DBperson.firstname,
			DBperson.lastname,
			DBperson.email,
			connection,
			registry,
		);
		registry?.addPerson(result);
		return result;
	}

	async insert() {
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
		this.registry?.addPerson(this.personId, this);
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

	async delete() {
		const sql = 'DELETE FROM person WHERE person_id = $id';
		try {
			await this.connection.run(sql, { $id: this.personId });
			this.registry?.deletePerson(this.personId);
		} catch (error) {
			throw new SQLException(error.message, sql);
		}
	}
}
