export class ApplicationException extends Error {
	constructor(error) {
		super(error.message);
		this.name = this.constructor.name;
	}
}

export class ValidationException extends ApplicationException {
	constructor(message, cause) {
		super(message);
		this.cause = cause;
	}
}
