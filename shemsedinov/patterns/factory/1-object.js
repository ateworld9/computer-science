//  'use strict'

function userFactory1(name, group, email) {
	return { name, group, email };
}

const userFactory2 = (name, group, email) => ({
	name,
	group,
	email,
});

const user1 = userFactory1('Dmitriy', 'progers', 'vahrameev.work@gmail.com');
console.log(user1);
const user2 = userFactory2('Dmitriy', 'progers', 'vahrameev.work@gmail.com');
console.log(user2);
