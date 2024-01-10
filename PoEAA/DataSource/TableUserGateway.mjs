import { all } from '../db/db.mjs';

class PersonGateway {
	async findAll() {
		const sql = 'SELECT * FROM person';
		let rows;
		try {
			rows = await all(sql);
		} catch (error) {
			console.log('PersonGateway findAll err', error.message);
		}
		return rows;
	}

	async findWhere(whereClause) {
		const sql = `SELECT * FROM person WHERE ${whereClause}`;
		let rows;
		try {
			rows = await all(sql);
		} catch (error) {
			console.log('PersonGateway findWhere err', error.message);
		}
		return rows;
	}

	async findWithLastname(name) {
		const sql = 'SELECT * FROM person WHERE person.lastname = $lastname';
		let rows;
		try {
			rows = await all(sql, { $lastname: name });
		} catch (error) {
			console.log('PersonGateway findWithLastname err', error.message);
		}
		return rows;
	}

	async findById(id) {
		const sql = 'SELECT * FROM person WHERE person_id = $id';
		let row;
		try {
			row = await all(sql, { $id: id });
		} catch (error) {
			console.log('PersonGateway findById err', error.message);
		}
		return row;
	}

	async update(id, lastname) {
		const sql = `
		UPDATE person SET
			firstname = $firstname,
			lastname = $lastname,
		WHERE person_id = $id`;
		try {
			await all(sql, {
				$lastname: lastname,
				$id: id,
			});
		} catch (error) {
			console.log('PersonGateway update err', error.message);
		}
	}

	async insert(firstname, lastname) {
		const sql = `
		INSERT INTO person VALUES (
			$firstname,
			$lastname
			)
		`;
		try {
			await all(sql, {
				$firstname: firstname,
				$lastname: lastname,
			});
		} catch (error) {
			console.log('PersonGateway update err', error.message);
		}
	}

	async delete() {
		const sql = 'DELETE FROM person WHERE person_id = $id';
		try {
			await all(sql);
		} catch (error) {
			console.log('PersonGateway update err', error.message);
		}
	}
}

const gateway = new PersonGateway();

const result = await gateway.findAll();
console.log('res', result);
