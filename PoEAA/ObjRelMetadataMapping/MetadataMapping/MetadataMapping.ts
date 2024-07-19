import { DB } from '../../db/db.js';
import { SQLException } from '../../errors/SQLException.js';
import { ApplicationException } from '../../errors/ApplicationException.js';
import type { SQLPersonI } from '../Person.interface.js';

class UOW<Type extends DomainClass> {
	data: Map<number, Type>;
	constructor() {
		this.data = new Map();
	}

	isLoaded(key: number) {
		return this.data.has(key);
	}
	getObject(key: number) {
		return this.data.get(key);
	}
	registerClean(obj: Type) {
		this.data.set(obj.getId(), obj);
	}
}

type SQLRow = { id: number };

export class DomainClass {
	protected id: number;
	constructor() {
		this.id = 0;
	}
	getId() {
		return this.id;
	}
	setId(id: number) {
		this.id = id;
	}

	newInstance<Type extends DomainClass>(...params: any) {
		const proto = Object.getPrototypeOf(this);
		return new proto.constructor(...params) as Type;
	}
}

/**
 * Описывает соответствие между классом приложения и таблицей базы данных
 */
export class DataMap {
	private domainClass: DomainClass;
	private tableName: string;
	private columnMaps: ColumnMap[];
	constructor(domainClass: DomainClass, tableName: string) {
		this.domainClass = domainClass;
		this.tableName = tableName;
		this.columnMaps = [];
	}

	getDomainClass() {
		return this.domainClass;
	}
	getTableName() {
		return this.tableName;
	}
	getColumns() {
		return this.columnMaps;
	}

	addColumn(columnName: string, columnType: string, fieldName: string) {
		const column = new ColumnMap(columnName, columnType, fieldName, this);
		this.columnMaps.push(column);
	}

	columnList() {
		return this.columnMaps.map((col) => col.getColumnName()).join(', ');
	}

	insertList() {
		return this.columnMaps.map((el) => '?').join(', ');
	}
	updateList() {
		return (
			' SET ' +
			this.columnMaps.map((col) => ` ${col.getColumnName()} = ? `).join(', ')
		);
	}
}

/**
 * Описывает соответствие между полем класса и столбцом таблицы
 */
class ColumnMap {
	private columnName: string;
	private columnType: string;
	private fieldName: string;
	private dataMap: DataMap;
	constructor(
		columnName: string,
		columnType: string,
		fieldName: string,
		dataMap: DataMap,
	) {
		this.columnName = columnName;
		this.columnType = columnType;
		this.fieldName = fieldName;
		this.dataMap = dataMap;
	}

	getFieldName() {
		return this.fieldName;
	}
	getColumnName() {
		return this.columnName;
	}
}

class AbstractMapper<Type extends DomainClass> {
	protected uow: UOW<Type>;
	protected dataMap: DataMap;
	protected connection: DB;

	constructor(dataMap: DataMap, connection: DB) {
		this.uow = new UOW();
		this.dataMap = dataMap;
		this.connection = connection;
	}
	async findObject(key: number) {
		if (this.uow.isLoaded(key)) return this.uow.getObject(key);

		const sql =
			' SELECT ' +
			' id, ' +
			this.dataMap.columnList() +
			' FROM ' +
			this.dataMap.getTableName() +
			' WHERE id = ? ';
		let resultSet;
		let result;

		try {
			resultSet = await this.connection.get<SQLRow>(sql, [key]);
			console.log('sql get resultSet:', resultSet);

			result = this.load(resultSet);
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}

		return result;
	}

	async findAll() {
		const sql =
			' SELECT ' +
			' id, ' +
			this.dataMap.columnList() +
			' FROM ' +
			this.dataMap.getTableName();

		let resultSet;

		try {
			resultSet = await this.connection.all<SQLPersonI>(sql);
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}

		let results = this.loadAll(resultSet);

		return results;
	}
	async findObjectsWhere(whereClause: string) {
		const sql =
			' SELECT ' +
			' id, ' +
			this.dataMap.columnList() +
			' FROM ' +
			this.dataMap.getTableName() +
			' WHERE ' +
			whereClause;

		let resultSet;

		try {
			resultSet = await this.connection.all<SQLPersonI>(sql);
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}

		let results = this.loadAll(resultSet);

		return results;
	}

	loadAll(resultSet: SQLRow[]) {
		return resultSet.map((row) => this.load(row));
	}

	/**
	 * throws InstantiationException, IllegalAccessException
	 * */
	load(row?: SQLRow) {
		if (row?.id === undefined) return undefined;
		const key = row.id;
		if (this.uow.isLoaded(key)) return this.uow.getObject(key);
		let instance = this.dataMap.getDomainClass().newInstance<Type>();
		instance.setId(key);
		this.uow.registerClean(instance);
		this.loadFields(row, instance);
		return instance;
	}
	/**
	 * throws SQLException
	 * */
	loadFields(row: SQLRow, instance: Type) {
		this.dataMap.getColumns().map((col) => {
			// idk how to to do it
			const fieldName = col.getFieldName();
			const setterName =
				'set' + fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

			// @ts-ignore
			instance[setterName](row[col.columnName]);
		});
	}

	async insert(instance: Type) {
		const sql =
			'INSERT INTO ' +
			this.dataMap.getTableName() +
			' ( ' +
			this.dataMap.columnList() +
			' ) ' +
			' VALUES (' +
			this.dataMap.insertList() +
			')';
		try {
			const response = await this.connection.run(
				sql,
				this.dataMap.getColumns().map((col) => {
					const fieldName = col.getFieldName();
					const getterName =
						'get' + fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
					// @ts-ignore
					return instance[getterName]();
				}),
			);

			if (response.changes === 0) {
				throw new ApplicationException(
					`no insert by class ${Object.getPrototypeOf(this).constructor.name}`,
				);
			}
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}
	}
	async update(instance: Type) {
		const sql =
			'UPDATE ' +
			this.dataMap.getTableName() +
			this.dataMap.updateList() +
			' WHERE id = ? ';

		try {
			const args = this.dataMap.getColumns().map((col) => {
				const fieldName = col.getFieldName();
				const getterName =
					'get' + fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
				// @ts-ignore
				return instance[getterName]();
			});
			args.push(instance.getId());
			const response = await this.connection.run(sql, args);
			if (response.changes === 0) {
				throw new ApplicationException(
					`no updates by class ${Object.getPrototypeOf(this).constructor.name}`,
				);
			}
		} catch (error) {
			throw new SQLException((error as Error).message, sql);
		}
	}
}

export class Person extends DomainClass {
	private firstname?: string;
	private lastname?: string;
	private email?: string;

	constructor() {
		super();
	}

	public getFirstname() {
		return this.firstname;
	}
	public setFirstname(firstname: string) {
		this.firstname = firstname;
	}
	public getLastname() {
		return this.lastname;
	}
	public setLastname(lastname: string) {
		this.lastname = lastname;
	}
	public getEmail() {
		return this.email;
	}
	public setEmail(email: string) {
		this.email = email;
	}
}

export class PersonMapper extends AbstractMapper<Person> {
	constructor(connection: DB) {
		super(new DataMap(new Person(), 'person'), connection);
		this.dataMap.addColumn('first_name', 'varchar', 'firstname');
		this.dataMap.addColumn('last_name', 'varchar', 'lastname');
		this.dataMap.addColumn('email', 'varchar', 'email');
	}

	findByLastname() {}
}
