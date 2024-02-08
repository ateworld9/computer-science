class DomainObject {
	PLACEHOLDER_ID = -1;
	constructor() {
		this.id = this.PLACEHOLDER_ID;
	}
	isNew() {
		return this.id === this.PLACEHOLDER_ID;
	}
}
