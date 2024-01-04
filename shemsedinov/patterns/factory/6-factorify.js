class Person {
	constructor(name) {
		this.name = name;
	}
}

const factorify =
	(Category) =>
	(...args) =>
		new Category(...args);

// Usage

const p1 = new Person('Dmitriy');
console.log(p1);

const personFactory = factorify(Person);
const p2 = personFactory('Ilysha');
console.log(p2);
