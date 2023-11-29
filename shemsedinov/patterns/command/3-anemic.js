/* eslint-disable no-param-reassign */
/* eslint-disable max-classes-per-file */
// 'use strict';

class AccountCommand {
  constructor(operation, account, amount) {
    this.operation = operation;
    this.account = account;
    this.amount = amount;
  }
}

class BankAccount {
  constructor(name) {
    this.name = name;
    this.balance = 0;
  }
}

class Bank {
  constructor() {
    this.operations = [];
  }

  operation(account, amount) {
    const operation = amount < 0 ? "Withdraw" : "Income";
    const command = new AccountCommand(
      operation,
      account.name,
      Math.abs(amount),
    );
    this.operations.push(command);
    account.balance += amount;
  }

  showOperations() {
    console.table(this.operations);
  }
}

// Usage

const bank = new Bank();
const account1 = new BankAccount("Marcus Aurelius");
bank.operation(account1, 1000);
bank.operation(account1, -50);
const account2 = new BankAccount("Antoninus Pius");
bank.operation(account2, 500);
bank.operation(account2, -100);
bank.operation(account2, 150);
bank.showOperations();
console.table([account1, account2]);
