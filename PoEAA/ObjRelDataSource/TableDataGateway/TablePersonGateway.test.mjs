import test from 'node:test';
import { initPersonsDB } from '../initPersonsDb.mjs';
import { PersonGateway } from './TablePersonGateway.mjs';
import assert from 'node:assert';
import {
	SQLConstraintUniqueException,
	SQLException,
} from '../../errors/SQLException.mjs';
import { connectDB } from '../../db/db.mjs';

const persons = [
	['Dmitiy', 'Vahrameev', 'vahrameev.work@gmail.com'],
	['Admin', 'Adminov', 'admin@gmail.com'],
	['Anton', 'Antonov', '3@gmail.com'],
	['Timur', 'Chochiev', 'chochiev@gmail.com'],
	['Ivan', 'Novikov', 'ubah@gmail.com'],
];

const personsResult = [
	{
		person_id: 1,
		firstname: 'Dmitiy',
		lastname: 'Vahrameev',
		email: 'vahrameev.work@gmail.com',
	},
	{
		person_id: 2,
		firstname: 'Admin',
		lastname: 'Adminov',
		email: 'admin@gmail.com',
	},
	{
		person_id: 3,
		firstname: 'Anton',
		lastname: 'Antonov',
		email: '3@gmail.com',
	},
	{
		person_id: 4,
		firstname: 'Timur',
		lastname: 'Chochiev',
		email: 'chochiev@gmail.com',
	},
	{
		person_id: 5,
		firstname: 'Ivan',
		lastname: 'Novikov',
		email: 'ubah@gmail.com',
	},
];

test('TablePersonGateway tests', async (t) => {
	const connect = await connectDB(
		'./ObjRelDataSource/TableDataGateway/persons.db',
		initPersonsDB,
		persons,
		false,
	);

	const gateway = new PersonGateway(connect);

	await t.test('findAll ', async () => {
		const result = await gateway.findAll();
		assert.deepStrictEqual(result, personsResult);
	});

	await t.test('findWhere ', async (t) => {
		await t.test('to find', async () => {
			const result = await gateway.findWhere("firstname = 'Timur'");
			assert.deepStrictEqual(result, [personsResult[3]]);
		});
		await t.test('to not find', async () => {
			const result = await gateway.findWhere("firstname = 'Tmur'");
			assert.deepStrictEqual(result, []);
		});
		await t.test('to reject with SQLException', async () => {
			assert.rejects(gateway.findWhere("first_nam = 'Timur'"), SQLException);
		});
	});

	await t.test('findByLastname ', async () => {
		const result = await gateway.findByLastname('Chochiev');
		assert.deepStrictEqual(result, [personsResult[3]]);
	});

	await t.test('findById ', async (t) => {
		await t.test('to find', async () => {
			const result = await gateway.findById(4);
			assert.deepStrictEqual(result, personsResult[3]);
		});
		await t.test('to not find', async () => {
			const result = await gateway.findById(1000);
			assert.deepStrictEqual(result, undefined);
		});
	});

	await t.test('update ', async () => {
		const person = await gateway.findById(3);
		await gateway.update(
			person.person_id,
			person.firstname,
			person.lastname,
			'antonov@gmail.com',
		);
		const updatedPerson = await gateway.findById(3);
		assert.deepStrictEqual(updatedPerson, {
			...personsResult[2],
			email: 'antonov@gmail.com',
		});
	});

	await t.test('insert', async (t) => {
		await t.test('to success', async () => {
			const newPerson = {
				person_id: 6,
				firstname: 'Ilya',
				lastname: 'Zoreev',
				email: 'tivoobweokom@mail.ru',
			};
			const result = await gateway.insert(
				newPerson.firstname,
				newPerson.lastname,
				newPerson.email,
			);
			assert.deepStrictEqual(result, [newPerson]);
		});

		await t.test('to throw unique', async () => {
			const newPerson = {
				person_id: 7,
				firstname: 'Ilya',
				lastname: 'Zoreev',
				email: 'tivoobweokom@mail.ru',
			};
			assert.rejects(
				gateway.insert(
					newPerson.firstname,
					newPerson.lastname,
					newPerson.email,
				),
				SQLConstraintUniqueException,
			);
		});
	});

	await t.test('delete', async (t) => {
		await t.test('success', async () => {
			const result = await gateway.delete(6);
			assert.deepStrictEqual(result, { id: 6, changes: 1 });
		});
		await t.test('failed', async () => {
			const result = await gateway.delete(7);
			assert.strictEqual(result.changes, 0);
		});
	});
});
