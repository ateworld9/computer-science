export class SQLException extends Error {
	constructor(message, sql, ...params) {
		if (message.startsWith('SQLITE_CONSTRAINT')) {
			throw new SQLConstraintException(message, sql);
		}
		super(sql ? message + '\n\t' + 'sql: ' + sql : message, params);
		this.name = 'SQLException';
	}
}

export class SQLConstraintException extends Error {
	constructor(message, sql, ...params) {
		const [errName, constraintType, field] = message.split(':');
		if (constraintType.trim().startsWith('UNIQUE')) {
			return new SQLConstraintUniqueException(
				constraintType,
				sql,
				field,
				...params,
			);
		}
		super(sql ? message + '\n\t' + 'sql: ' + sql : message, params);
		this.name = 'SQLConstraintException';
	}
}

export class SQLConstraintUniqueException extends Error {
	constructor(message, sql, field, ...params) {
		message += ': ' + field;
		super(sql ? message + '\n\t' + 'sql: ' + sql : message, params);
		this.field = field;
		this.name = 'SQLConstraintUniqueException';
	}
}
