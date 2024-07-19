export class ApplicationException extends Error {
	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
	}
}

export class ValidationException extends ApplicationException {
	cause;
	constructor(message: string, cause: string) {
		super(message);
		this.cause = cause;
	}
}
