export const createPersonsRegistry = () => {
	const persons = new Map();

	return {
		addPerson(person) {
			persons.set(person.personId, person);
		},
		deletePerson(personId) {
			persons.delete(personId);
		},
		getPerson(personId) {
			return persons.get(personId);
		},
	};
};
