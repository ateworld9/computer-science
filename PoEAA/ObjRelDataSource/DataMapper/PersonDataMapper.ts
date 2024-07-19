import { DB } from '../../db/db.js';
import { ApplicationException } from '../../errors/ApplicationException.js';
import { SQLException } from '../../errors/SQLException.js';
import { SQLPersonI } from '../Person.interface.js';

// Layer Superclass
// export abstract class AbstractMapper {
// 	protected registry: Map<any, any>;
// 	protected connection: DB;

// 	constructor(connection: DB) {
// 		this.registry = new Map();
// 		this.connection = connection;
// 	}
// 	load(resultSet) {
// 		const id = resultSet.id;
// 		if (this.registry.has(id)) return this.registry.get(id);
// 		let result = this.doLoad(resultSet);
// 		this.registry.set(id, result);
// 		return result;
// 	}

// 	loadAll(resultSet) {
// 		return resultSet.map((row) => this.load(row));
// 	}

// 	// TODO
// 	findById(id: number) {}
// 	findMany(source: Statement) {}
// 	insert() {}

// 	abstract doLoad(resultSet: any): any;
// 	abstract doInsert(domainObject: any, stmt: Statement): any;
// }

export class Person {
	private id: number | undefined;
	private firstname: string;
	private lastname: string;
	private email: string;

	constructor(
		id: number | undefined,
		firstname: string,
		lastname: string,
		email: string,
	) {
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
	}

	getId() {
		return this.id;
	}
	getFirstname() {
		return this.firstname;
	}
	setFirstname(firstname: string) {
		this.firstname = firstname;
	}
	getLastname() {
		return this.lastname;
	}
	setLastname(lastname: string) {
		this.lastname = lastname;
	}
	getEmail() {
		return this.email;
	}
	setEmail(email: string) {
		this.email = email;
	}
}

// instance for every request
// cause of cached persons
export class PersonMapper {
	private registry: Map<number, Person>;
	private connection: DB;

	constructor(connection: DB) {
		// super(connection);
		this.registry = new Map();
		this.connection = connection;
	}

	static COLUMNS = 'id, firstname, lastname, email ';

	doLoad(personDB: SQLPersonI) {
		return new Person(
			personDB.id,
			personDB.firstname,
			personDB.lastname,
			personDB.email,
		);
	}

	load(resultSet?: SQLPersonI) {
		if (resultSet === undefined) {
			return undefined;
		}
		const id = resultSet.id;
		if (this.registry.has(id)) return this.registry.get(id);
		let result = this.doLoad(resultSet);
		this.registry.set(id, result);
		return result;
	}

	loadAll(resultSet: SQLPersonI[]) {
		return resultSet.map((row) => this.load(row));
	}

	async findById(id: number) {
		if (this.registry.has(id)) return this.registry.get(id);
		let findStatement =
			'SELECT ' + PersonMapper.COLUMNS + 'FROM person ' + 'WHERE id = ?';

		let resultSet;
		try {
			resultSet = await this.connection.get<SQLPersonI>(findStatement, [id]);
		} catch (error) {
			throw new SQLException((error as Error).message, findStatement);
		}
		return this.load(resultSet);
	}
	async findByLastname(lastname: string) {
		let resultSet;
		let findStatement =
			'SELECT ' + PersonMapper.COLUMNS + 'FROM person ' + 'WHERE lastname = ? ';
		try {
			resultSet = await this.connection.all<SQLPersonI>(findStatement, [
				lastname,
			]);
			return this.loadAll(resultSet);
		} catch (error) {
			throw new SQLException((error as Error).message, findStatement);
		}
	}

	async findAll() {
		const sql = 'SELECT ' + PersonMapper.COLUMNS + 'FROM person ';
		let resultSet: SQLPersonI[];
		try {
			resultSet = await this.connection.all<SQLPersonI>(sql);
			return this.loadAll(resultSet);
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}
	}

	// domain object
	async insert(person: Person) {
		const sql =
			'INSERT INTO person (firstname, lastname, email) VALUES ($firstname, $lastname, $email) RETURNING *';

		try {
			return await this.connection.get(sql, {
				$firstname: person.getFirstname(),
				$lastname: person.getLastname(),
				$email: person.getEmail(),
			});
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}
	}

	async update(person: Person) {
		const sql =
			'UPDATE person ' +
			'SET firstname = $firstname, lastname = $lastname, email = $email ' +
			'WHERE id = $id';

		try {
			await this.connection.run(sql, {
				$firstname: person.getFirstname(),
				$lastname: person.getLastname(),
				$email: person.getEmail(),
				$id: person.getId(),
			});
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}
	}

	async delete(person: Person) {
		const sql = 'DELETE FROM person WHERE id = ?';

		let id = person.getId();
		if (!id) {
			throw new ApplicationException('Person is not found');
		}

		this.registry.delete(id);
		try {
			await this.connection.run(sql, [id]);
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}
	}
}

// TODO!!
