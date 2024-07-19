import test from 'node:test';
import { connectDB } from '../../db/db.js';
import { initPersonsDB } from '../initPersonsDB.js';

import { DomainClass, Person, PersonMapper } from './MetadataMapping.js';
import assert from 'node:assert';

const connect = await connectDB(
	'./ObjRelMetadataMapping/MetadataMapping/persons.db',
	initPersonsDB,
	false,
	true,
);
const personsResult = [
	{
		id: 1,
		firstname: 'Dmitriy',
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

const personMapper = new PersonMapper(connect);

// const result = personMapper.findObjectsWhere('1=1');
// console.log(result);
try {
	const result1 = await personMapper.findObject(1);
	const result2 = await personMapper.findObject(1);
	console.log('test: ', result1, result2);
} catch (error) {
	console.log(error);
}

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

test('MetadataMapping tests', async (t) => {
	const personMapper = new PersonMapper(connect);

	await t.test('findAll test', async () => {
		let result = await personMapper.findAll();
		assert.deepEqual(result, personsResult);
	});

	await t.test('findById test', async (t) => {
		await t.test('to found', async () => {
			const person = await personMapper.findObject(4);
			assert.deepEqual(personAdapter(person as Person), personsResult[3]);
		});
		await t.test('to not found', async () => {
			const result = await personMapper.findObject(1000);
			assert.deepEqual(result, undefined);
		});
	});

	await t.test('update test', async () => {
		const person = await personMapper.findObject(3);
		if (person) {
			person.setEmail('antonov@gmail.com');
			await personMapper.update(person);
		}
		const updatedPerson = await personMapper.findObject(3);

		const expectedPerson = {
			...personsResult[2],
			email: 'antonov@gmail.com',
		};

		assert.deepEqual(personAdapter(updatedPerson), expectedPerson);
	});

	await t.test('insert test', async () => {
		const newPerson = new Person();
		newPerson.setFirstname('Ilya');
		newPerson.setLastname('Zoreev');
		newPerson.setEmail('tivoobweokom@mail.ru');
		await personMapper.insert(newPerson);
		const result = await personMapper.findObjectsWhere('first_name = "Ilya" ');
		if (result[0]) newPerson.setId(result[0]?.getId());
		assert.deepEqual(result[0], newPerson);
	});
});
