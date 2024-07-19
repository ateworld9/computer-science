import { SQLException } from '../../errors/SQLException.js';
import { DB } from '../../db/db.js';

export class PersonRecord {
	private id: number;
	private firstname: string;
	private lastname: string;
	private email: string;

	private connection: DB;

	constructor(id, firstname, lastname, email, connection) {
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;

		this.connection = connection;
	}

	public getId() {
		return this.id;
	}
	public getFirstname() {
		return this.firstname;
	}
	public setFirstname(firstname: string) {
		this.firstname = firstname;
	}
	public getLastname() {
		return this.lastname;
	}
	public setLastname(lastname: string) {
		this.lastname = lastname;
	}
	public getEmail() {
		return this.email;
	}
	public setEmail(email: string) {
		this.email = email;
	}

	static async findAll(connection, registry) {
		const sql = 'SELECT id, firstname, lastname, email FROM person';

		let personRows;
		try {
			personRows = await connection.all(sql);
		} catch (error) {
			throw new SQLException(error.message, sql);
		}
		const persons = personRows.map((personDB) =>
			PersonRecord.load(personDB, connection, registry),
		);
		return persons;
	}
	static async findById(id, connection, registry) {
		const sql =
			'SELECT id, firstname, lastname, email FROM person WHERE id = $id';
		let result;
		if (registry) {
			result = registry.getPerson(id);
		}
		if (result !== undefined) {
			return result;
		}
		let personDB;
		try {
			personDB = await connection.get(sql, { $id: id });
		} catch (error) {
			throw new SQLException(error.message, sql);
		}
		if (personDB === undefined) {
			return undefined;
		}
		const person = PersonRecord.load(personDB, connection, registry);
		return person;
	}
	// Adapter from DBperson to Person
	static load(DBperson, connection, registry) {
		let result = registry?.getPerson(DBperson.id) ?? undefined;
		if (result !== undefined) {
			return result;
		}
		result = new PersonRecord(
			DBperson.id,
			DBperson.firstname,
			DBperson.lastname,
			DBperson.email,

			connection,
		);
		registry?.addPerson(result);
		return result;
	}

	async insert(registry) {
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
		this.id = resultSet[0].id;
		registry?.addPerson(this.id, this);
		return this;
	}

	async update() {
		const sql =
			'UPDATE person SET ' +
			'firstname = $firstname, ' +
			'lastname = $lastname, ' +
			'email = $email ' +
			'WHERE id = $id ';
		try {
			const result = await this.connection.run(sql, {
				$firstname: this.firstname,
				$lastname: this.lastname,
				$email: this.email,
				$id: this.id,
			});
			return result;
		} catch (error) {
			throw new SQLException(error.message, sql);
		}
	}

	async delete(Registry) {
		const sql = 'DELETE FROM person WHERE id = $id';
		try {
			await this.connection.run(sql, { $id: this.id });
			Registry?.deletePerson(this.id);
		} catch (error) {
			throw new SQLException(error.message, sql);
		}
	}
}
