// 'use strict';

const { EventEmitter } = require("node:events");

const eventBus = new EventEmitter();

const { BankWrite } = require("./writer.js");
const { BankRead } = require("./reader.js");

const writeApi = new BankWrite(eventBus);
const readApi1 = new BankRead(eventBus);
const readApi2 = new BankRead(eventBus);
const readApi3 = new BankRead(eventBus);

const dima = "Dmitriy Vahrameev";
writeApi.createAccount(dima);
writeApi.operation(dima, 1000);
writeApi.operation(dima, -50);

const ilya = "Ilya Zoreev";
writeApi.createAccount(ilya);
writeApi.operation(ilya, 500);
writeApi.operation(ilya, -100);
writeApi.operation(ilya, 150);

const res1 = readApi1.select({ account: dima });
console.table(res1);
const dimaBalance1 = readApi1.getAccount(dima);
console.dir({ dimaBalance1 });

const res2 = readApi2.select({ account: ilya, operation: "Income" });
console.table(res2);

const res3 = readApi3.select({ operation: "Withdraw" });
console.table(res3);
