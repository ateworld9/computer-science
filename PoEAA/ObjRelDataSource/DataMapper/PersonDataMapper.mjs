import { SQLException } from '../../errors/SQLException.mjs';

export class AbstractMapper {
	constructor(connection) {
		this.loadedMap = new Map();
		this.connection = connection;
	}
	load(personDB) {
		const id = personDB.person_id;
		if (this.loadedMap.has(id)) return this.loadedMap.get(id);
		let result = this.doLoad(personDB);
		this.loadedMap.set(id, result);
		return result;
	}

	loadAll(resultSet) {
		return resultSet.map((row) => this.load(row));
	}

	// can be moved to abstract class
	findById() {}
	insert() {}
}

export class Person {
	constructor(personId, firstname, lastname, email) {
		this.personId = personId;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
	}
}

// instance for every request
// cause of cached persons
export class PersonMapper extends AbstractMapper {
	constructor(connection) {
		// this.loadedMap = new Map();
		// this.connection = connection;
		super(connection);
	}
	doLoad(personDB) {
		return new Person(
			personDB.person_id,
			personDB.firstname,
			personDB.lastname,
			personDB.email,
		);
	}
	static COLUMNS = 'person_id, firstname, lastname, email ';
	static findByIdStatement =
		'SELECT ' + PersonMapper.COLUMNS + 'FROM person ' + 'WHERE person_id = $id';

	async findById(id) {
		let result = this.loadedMap.get(id);
		if (result !== undefined) return result;
		let findStatement = PersonMapper.findByIdStatement;
		try {
			result = await this.connection.get(findStatement, { $id: id });
		} catch (error) {
			throw new SQLException(error.message, findStatement);
		}
		return this.load(result);
	}
	static findByLastnameStatement() {
		return (
			'SELECT ' +
			PersonMapper.COLUMNS +
			'FROM person ' +
			'WHERE lastname = $lastname '
		);
	}
	async findByLastname(lastname) {
		let resultSet;
		let findStatement = PersonMapper.findByLastnameStatement();
		try {
			resultSet = await this.connection.all(findStatement, {
				$lastname: lastname,
			});
			return this.loadAll(resultSet);
		} catch (error) {
			throw new SQLException(error.message, findStatement);
		}
	}

	static findAllStatement() {
		return (
			'SELECT ' +
			PersonMapper.COLUMNS +
			'FROM person ' +
			'WHERE lastname = $lastname '
		);
	}
	findAll() {}

	static updateStatement =
		'UPDATE person' +
		'SET firstname = $firstname, lastname = $lastname, email = $email' +
		'WHERE id = $id';

	async update(person) {
		try {
			await this.connection.run(PersonMapper.updateStatement, {
				$firstname: person.firstname,
				$lastname: person.lastname,
				$email: person.email,
				id: person.personId,
			});
		} catch (error) {
			throw new SQLException(error.message, PersonMapper.updateStatement);
		}
	}

	// async find(id) {
	// 	let result = this.loadedMap.get(id);
	// 	if (result !== undefined) return result;
	// 	let findStatement = this.findStatement();
	// 	try {
	// 		result = await this.connection.get(findStatement, { $id: id });
	// 	} catch (error) {
	// 		throw new SQLException(error.message, findStatement);
	// 	}
	// }
	// load(resultSet) {
	// 	const id = resultSet.person_id;
	// 	if (this.loadedMap.has(id)) return this.loadedMap.get(id);
	// 	let result = this.doLoad(id, resultSet);
	// 	this.loadedMap.set(id, result);
	// 	return result;
	// }
	// loadAll(resultSet) {
	// 	return resultSet.map((row) => this.load(row));
	// }
}
