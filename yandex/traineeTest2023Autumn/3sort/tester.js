const sortByTemplate = require('./source.js');

// const array = [
//   { id: 2, name: 'Alice' },
//   { id: 1, asdf: { name: 'Bob' } },
//   { id: 3, name: 'Charlie' },
//   { id: 4, name: 'David' },
//   { id: 0 },
// ];

// const order = ['Bob', 'Alice', 'Charlie'];
// const field = 'name';

// const sortedArray = sortByTemplate(array, order, field);
// console.log(sortedArray);
// const sortedArray2 = sortByTemplate(array, order, 'id');
// console.log(sortedArray2);
// const sortedArray3 = sortByTemplate([], order, field);
// console.log(sortedArray3);
// const sortedArray4 = sortByTemplate(array, order, 'idsss');
// console.log(sortedArray4);

const arr = [
	{
		field: {
			field1: 'Новости',
			'something-else': {},
		},
	},
	{
		field: {
			field1: 'Контакты',
			'something-else': {},
		},
	},
	{
		field: {
			field1: 'Еще раздел',
			'something-else': {},
		},
	},
	{
		field: {
			field1: 'О компании',
			'something-else': {},
		},
	},
	{
		field: {
			field1: 'Главная',
			'something-else': {},
		},
	},
];

const orderr = ['Главная', 'О компании', 'Новости'];
const sortedArr = sortByTemplate(arr, orderr, 'field1');
console.log(sortedArr);
const obj = { field: { field1: 'Новости', 'something-else': {} } };
