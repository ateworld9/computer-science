import test from 'node:test';
import assert from 'node:assert';

import { connectDB } from '../../db/db.js';
import { initPersonsDB } from '../initPersonsDb.js';

import { Person, PersonMapper } from './PersonDataMapper.js';

const persons = [
	['Dmitiy', 'Vahrameev', 'vahrameev.work@gmail.com'],
	['Admin', 'Adminov', 'admin@gmail.com'],
	['Anton', 'Antonov', '3@gmail.com'],
	['Timur', 'Chochiev', 'chochiev@gmail.com'],
	['Ivan', 'Novikov', 'ubah@gmail.com'],
];

const personsResult = [
	{
		id: 1,
		firstname: 'Dmitiy',
		lastname: 'Vahrameev',
		email: 'vahrameev.work@gmail.com',
	},
	{
		id: 2,
		firstname: 'Admin',
		lastname: 'Adminov',
		email: 'admin@gmail.com',
	},
	{
		id: 3,
		firstname: 'Anton',
		lastname: 'Antonov',
		email: '3@gmail.com',
	},
	{
		id: 4,
		firstname: 'Timur',
		lastname: 'Chochiev',
		email: 'chochiev@gmail.com',
	},
	{
		id: 5,
		firstname: 'Ivan',
		lastname: 'Novikov',
		email: 'ubah@gmail.com',
	},
];

const connect = await connectDB(
	'./ObjRelDataSource/DataMapper/persons.db',
	initPersonsDB,
	false,
	true,
);

const personAdapter = (person?: Person) =>
	person
		? {
				id: person.getId(),
				firstname: person.getFirstname(),
				lastname: person.getLastname(),
				email: person.getEmail(),
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  }
		: undefined;

test('DataMapper tests', async (t) => {
	const personMapper = new PersonMapper(connect);

	await t.test('findAll test', async () => {
		let result = await personMapper.findAll();
		assert.deepEqual(result, personsResult);
	});

	await t.test('findById test', async (t) => {
		await t.test('to found', async () => {
			const person = await personMapper.findById(4);
			assert.deepEqual(personAdapter(person), personsResult[3]);
		});
		await t.test('to not found', async () => {
			const result = await personMapper.findById(1000);
			assert.deepEqual(result, undefined);
		});
	});

	await t.test('update test', async () => {
		const person = await personMapper.findById(3);
		if (person) {
			person.setEmail('antonov@gmail.com');
			await personMapper.update(person);
		}
		const updatedPerson = await personMapper.findById(3);

		const expectedPerson = {
			...personsResult[2],
			email: 'antonov@gmail.com',
		};

		assert.deepEqual(personAdapter(updatedPerson), expectedPerson);
	});

	await t.test('insert test', async () => {
		const newPersonData = ['Ilya', 'Zoreev', 'tivoobweokom@mail.ru'] as const;
		const newPerson = new Person(undefined, ...newPersonData);
		const result = await personMapper.insert(newPerson);
		assert.deepEqual(result, new Person(6, ...newPersonData));
	});
});
