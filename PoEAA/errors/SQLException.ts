export class SQLException extends Error {
	constructor(message: string, sql: string) {
		if (message.startsWith('SQLITE_CONSTRAINT')) {
			throw new SQLConstraintException(message, sql);
		}
		super(sql ? message + '\n\t' + 'sql: ' + sql : message);
		this.name = 'SQLException';
	}
}

export class SQLConstraintException extends Error {
	constructor(message: string, sql: string) {
		const [errName, constraintType, field] = message.split(':');
		if (constraintType.trim().startsWith('UNIQUE')) {
			return new SQLConstraintUniqueException(constraintType, sql, field);
		}
		super(sql ? message + '\n\t' + 'sql: ' + sql : message);
		this.name = 'SQLConstraintException';
	}
}

export class SQLConstraintUniqueException extends Error {
	field: string;
	constructor(message: string, sql: string, field: string) {
		message += ': ' + field;
		super(sql ? message + '\n\t' + 'sql: ' + sql : message);
		this.field = field;
		this.name = 'SQLConstraintUniqueException';
	}
}
