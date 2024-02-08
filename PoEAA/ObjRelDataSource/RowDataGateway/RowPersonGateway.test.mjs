import test from 'node:test';
import assert from 'node:assert';
import { initPersonsDB } from '../initPersonsDb.mjs';
import { PersonFinder, PersonGateway } from './RowPersonGateway.mjs';
import { createPersonsRegistry } from '../Registry.mjs';
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
		personId: 1,
		firstname: 'Dmitiy',
		lastname: 'Vahrameev',
		email: 'vahrameev.work@gmail.com',
	},
	{
		personId: 2,
		firstname: 'Admin',
		lastname: 'Adminov',
		email: 'admin@gmail.com',
	},
	{
		personId: 3,
		firstname: 'Anton',
		lastname: 'Antonov',
		email: '3@gmail.com',
	},
	{
		personId: 4,
		firstname: 'Timur',
		lastname: 'Chochiev',
		email: 'chochiev@gmail.com',
	},
	{
		personId: 5,
		firstname: 'Ivan',
		lastname: 'Novikov',
		email: 'ubah@gmail.com',
	},
];

const personAdapter = (person) => ({
	personId: person.personId,
	firstname: person.firstname,
	lastname: person.lastname,
	email: person.email,
});

test('RowPersonGateway tests', async (t) => {
	const connect = await connectDB(
		'./ObjRelDataSource/RowDataGateway/persons.db',
		initPersonsDB,
		persons,
		false,
	);
	const registry = createPersonsRegistry();
	const finder = new PersonFinder(connect, registry);

	await t.test('findAll test', async () => {
		let result = await finder.findAll();
		assert.deepEqual(result.map(personAdapter), personsResult);
	});

	await t.test('findById test', async (t) => {
		await t.test('to found', async () => {
			const person = await finder.findById(4);
			assert.deepEqual(personAdapter(person), personsResult[3]);
		});
		await t.test('to not found', async () => {
			const result = await finder.findById(1000);
			assert.deepEqual(result, undefined);
		});
	});

	await t.test('update test', async () => {
		const person = await finder.findById(3);
		person.email = 'antonov@gmail.com';
		const res = await person.update();
		const updatedPerson2 = await finder.findById(3);
		const updatedPerson = await finder.findById(3);

		const expectedPerson = {
			...personsResult[2],
			email: 'antonov@gmail.com',
		};

		assert.deepEqual(personAdapter(updatedPerson), expectedPerson);
		assert.deepEqual(personAdapter(updatedPerson2), expectedPerson);
	});

	await t.test('insert test', async () => {
		const newPerson = new PersonGateway(
			6,
			'Ilya',
			'Zoreev',
			'tivoobweokom@mail.ru',
			connect,
			registry,
		);
		const result = await newPerson.insert();
		assert.deepEqual(result, newPerson);
	});

	// await t.test('delete test', async () => {});
});
