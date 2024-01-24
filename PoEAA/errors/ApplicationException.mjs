export class ApplicationException extends Error {
	constructor(error) {
		super(error.message);
		this.name = 'ApplicationException';
	}
}
