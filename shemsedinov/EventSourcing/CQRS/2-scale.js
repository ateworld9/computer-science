/* eslint-disable no-restricted-syntax */
/* eslint-disable max-classes-per-file */
// 'use strict'

const { table } = require('node:console');
const { EventEmitter } = require('node:events');

const eventBus = new EventEmitter();

class AccountCommand {
	constructor(account, operation, amount) {
		this.account = account;
		this.operation = operation;
		this.amount = amount;
	}
}

class AccountQuery {
	constructor(account, operation) {
		this.account = account;
		this.operation = operation;
		this.rows = 0;
	}
}

class BankAccount {
	constructor(name) {
		this.name = name;
		this.balance = 0;
		BankAccount.collection.set(name, this);
	}
}

BankAccount.collection = new Map();

const operations = {
	Withdraw: (command) => {
		const account = BankAccount.collection.get(command.account);
		account.balance -= command.amount;
	},
	Income: (command) => {
		const account = BankAccount.collection.get(command.account);
		account.balance += command.amount;
	},
};

class BankWrite {
	constructor() {
		this.commands = [];
	}

	operation(account, amount) {
		const operation = amount < 0 ? 'Withdraw' : 'Income';
		const execute = operations[operation];
		const command = new AccountCommand(
			account.name,
			operation,
			Math.abs(amount),
		);
		this.commands.push(command);
		eventBus.emit('command', command);
		console.dir(command);
		execute(command);
	}
}

class BankRead {
	constructor() {
		this.commands = [];
		this.queries = [];
		eventBus.on('command', (command) => {
			this.commands.push(command);
		});
	}

	select({ account, operation }) {
		const query = new AccountQuery(account, operation);
		this.queries.push(query);
		const result = [];
		for (const command of this.commands) {
			let condition = true;
			if (account) condition = command.account === account;
			if (operation) condition = condition && command.operation === operation;
			if (condition) result.push(command);
		}
		query.rows = result.length;
		console.dir(query);
		return result;
	}
}

// Usage

const writeApi = new BankWrite();
const readApi1 = new BankRead();
const readApi2 = new BankRead();
const readApi3 = new BankRead();

const account1 = new BankAccount('Dmitriy Vahrameev');
writeApi.operation(account1, 1000);
writeApi.operation(account1, -50);
const account2 = new BankAccount('Ilya Zoreev');
writeApi.operation(account2, 500);
writeApi.operation(account2, -100);
writeApi.operation(account2, 150);
console.table([account1, account2]);

const res1 = readApi1.select({ account: 'Dmitriy Vahrameev' });
console.table(res1);

const res2 = readApi2.select({ account: 'Ilya Zoreev', operation: 'Income' });
console.table(res2);

const res3 = readApi3.select({ operation: 'Withdraw' });
console.table(res3);

console.table(readApi3.queries);
