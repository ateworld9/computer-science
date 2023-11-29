/* eslint-disable no-restricted-syntax */
/* eslint-disable max-classes-per-file */
// 'use script'

class BankAccount {
  constructor(name) {
    this.name = name;
    this.balance = 0;
  }

  getBalance() {
    return this.balance;
  }

  available(amount) {
    return this.balance >= amount;
  }

  withdraw(amount) {
    this.balance -= amount;
  }

  income(amount) {
    this.balance += amount;
  }
}

class Bank {
  constructor() {
    this.accounts = new Map();
  }

  transfer(from, to, amount) {
    const source = this.accounts.get(from);
    const destination = this.accounts.get(to);
    if (!source || !destination) return false;
    if (!source.available(amount)) return false;
    source.withdraw(amount);
    destination.income(amount);
    return true;
  }

  total() {
    let sum = 0;
    for (const account of this.accounts.values()) {
      const balance = account.getBalance();
      sum += balance;
    }

    return sum;
  }

  openAccount(name, amount = 0) {
    if (this.accounts.get(name)) return false;
    const account = new BankAccount(name);
    this.accounts.set(name, account);
    if (amount) account.income(amount);
    return true;
  }
}

// Usage

const bank = new Bank();

bank.openAccount('Dmitriy Vahrameev');
bank.openAccount('Ilya Zoreev', 1000);

const total1 = bank.total();
console.table(bank.accounts);
console.log('Total before transfer:', total1);
bank.transfer('Ilya Zoreev', 'Dmitriy Vahrameev', 50);
console.table(bank.accounts);
const total2 = bank.total();
console.log('Total after transfer:', total2);
