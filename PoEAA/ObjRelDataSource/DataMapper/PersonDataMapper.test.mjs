import { PersonMapper } from './PersonDataMapper.mjs';
import { connectDB } from '../../db/db.mjs';
import { initPersonsDB } from '../initPersonsDb.mjs';
import test from 'node:test';

const persons = [
	['Dmitiy', 'Vahrameev', 'vahrameev.work@gmail.com'],
	['Admin', 'Adminov', 'admin@gmail.com'],
	['Anton', 'Antonov', '3@gmail.com'],
	['Timur', 'Chochiev', 'chochiev@gmail.com'],
	['Ivan', 'Novikov', 'ubah@gmail.com'],
];

const connect = await connectDB(
	'./ObjRelDataSource/DataMapper/persons.db',
	initPersonsDB,
	false,
	true,
);
const personMapper = new PersonMapper(connect);

// const person = await personMapper.findById(1);
// console.log(person);
// const person2 = await personMapper.findById(1);
// console.log(person2);
// TODO tests
test('DataMapper test', { todo: true });
