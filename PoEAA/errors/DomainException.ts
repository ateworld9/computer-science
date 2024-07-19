export class DomainException extends Error {
	constructor(error) {
		super(error.message);
		this.name = this.constructor.name;
	}
}
