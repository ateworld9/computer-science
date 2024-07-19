import { DB } from '../../db/db.js';
import type { SQLPersonI } from '../Person.interface.js';
import { SQLException } from '../../errors/SQLException.js';

type PersonRegistry = Map<number, PersonGateway>;

export class PersonFinder {
	private connection: DB;
	private registry: PersonRegistry;

	constructor(connection: DB, registry: PersonRegistry) {
		this.connection = connection;
		this.registry = registry;
	}
	async findAll() {
		const sql = 'SELECT id, firstname, lastname, email FROM person';

		let personRows: SQLPersonI[];
		try {
			personRows = await this.connection.all<SQLPersonI>(sql);
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}
		const persons = personRows.map((personDB) =>
			PersonGateway.load(personDB, this.connection, this.registry),
		);
		return persons;
	}

	async findById(id: number) {
		const sql =
			'SELECT id, firstname, lastname, email FROM person WHERE id = $id';
		let result;
		if (this.registry) {
			result = this.registry.get(id);
		}
		if (result !== undefined) {
			return result;
		}
		let personDB: SQLPersonI;
		try {
			personDB = await this.connection.get(sql, { $id: id });
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}
		if (personDB === undefined) {
			return undefined;
		}
		const person = PersonGateway.load(personDB, this.connection, this.registry);
		return person;
	}
}

export class PersonGateway {
	private id: number; // Better use Layer Supertype
	private firstname: string;
	private lastname: string;
	private email: string;

	private connection: DB;
	private registry: PersonRegistry;

	constructor(
		id: number,
		firstname: string,
		lastname: string,
		email: string,
		connection: DB,
		registry: PersonRegistry,
	) {
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.connection = connection;
		this.registry = registry;
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

	// Adapter from DBperson to PersonGateway Row
	static load(DBperson: SQLPersonI, connection: DB, registry: PersonRegistry) {
		let result = registry?.get(DBperson.id) ?? undefined;
		if (result !== undefined) {
			return result;
		}
		result = new PersonGateway(
			DBperson.id,
			DBperson.firstname,
			DBperson.lastname,
			DBperson.email,
			connection,
			registry,
		);
		registry?.set(result.id, result);
		return result;
	}

	async insert() {
		const sql =
			'INSERT INTO person (firstname, lastname, email) VALUES ($firstname, $lastname, $email) RETURNING *';
		let resultSet: SQLPersonI[];
		try {
			resultSet = await this.connection.all(sql, [
				this.firstname,
				this.lastname,
				this.email,
			]);
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}
		this.id = resultSet[0].id;
		this.registry?.set(this.id, this);
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
			throw new SQLException((error as Error).message, sql);
		}
	}

	async delete() {
		const sql = 'DELETE FROM person WHERE id = ?';
		try {
			await this.connection.run(sql, [this.id]);
			this.registry?.delete(this.id);
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}
	}
}
