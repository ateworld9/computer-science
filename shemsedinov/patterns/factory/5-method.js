class Person {
	constructor(name) {
		this.name = name
	}

	static factory(name) {
		return new Person(name)
	}
}

// Usage
const p1 = new Person('Dmitriy')
console.log(p1)
const p2 = Person.factory('Ilysha')
console.log(p2)
