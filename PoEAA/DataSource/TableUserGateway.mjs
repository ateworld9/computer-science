import knexdb from '../index.js';

class PersonGateway {
	async findAll() {
		const sql = 'SELECT * FROM person';
		// return person;
	}

	async findWithLastname(name) {
		const sql = `SELECT * FROM person WHERE person.lastname = $lastname`;
		// return person;
	}

	async findWhere(whereClause) {}

	async findById(key) {}
}
