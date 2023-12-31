/* eslint-disable no-restricted-syntax */
/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
// 'use strict'

class AccountCommand {
	constructor(account, amount) {
		this.account = account;
		this.amount = amount;
	}

	execute() {
		throw new Error('Command is not implemented');
	}
}

class Withdraw extends AccountCommand {
	execute() {
		this.account.balance -= this.amount;
	}
}

class Income extends AccountCommand {
	execute() {
		this.account.balance += this.amount;
	}
}

class BankAccount {
	// Receiver or Target
	constructor(name) {
		this.name = name;
		this.balance = 0;
	}
}

class Bank {
	// Invoker
	constructor() {
		this.commands = [];
	}

	operation(account, amount) {
		const Command = amount < 0 ? Withdraw : Income;
		const command = new Command(account, Math.abs(amount));
		command.execute();
		this.commands.push(command);
	}

	showOperations() {
		const output = [];
		for (const command of this.commands) {
			output.push({
				operation: command.constructor.name,
				account: command.account.name,
				amount: command.amount,
			});
		}

		console.table(output);
	}
}
// Usage

const bank = new Bank();
const account1 = new BankAccount('Dmitriy Vahrameev');
bank.operation(account1, 1000);
console.log(account1);
bank.operation(account1, -50);
console.log(account1);
const account2 = new BankAccount('Ilya Zoreev');
bank.operation(account2, 500);
bank.operation(account2, -100);
bank.operation(account2, 150);
bank.showOperations();
console.table([account1, account2]);
