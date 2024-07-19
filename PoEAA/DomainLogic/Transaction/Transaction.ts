import currency from 'currency.js';
import dayjs, { Dayjs } from 'dayjs';

import { SQLException } from '../../errors/SQLException.js';
import { ApplicationException } from '../../errors/ApplicationException.js';

import type { DB } from '../../db/db.js';

interface SQLRecognition {
	contract_id: number;
	amount: number;
	recognized_on: number | string;
}

interface SQLContract {
	contract_id: number;
	product_id: number;
	revenue: number;
	date_signed: number | string;
	type: string;
}

export class RecognitionsGateway {
	connection: DB;
	constructor(connection: DB) {
		this.connection = connection;
	}
	private static findRecognitionsStatement =
		'SELECT amount ' +
		'FROM revenue_recognitions ' +
		'WHERE contract_id = $contractId ' +
		'AND recognized_on <= $recognizedOn ;';
	async findRecognitionsFor(contractId: number, asOf: number | string | Dayjs) {
		let resultSet;
		try {
			resultSet = await this.connection.all<SQLRecognition>(
				RecognitionsGateway.findRecognitionsStatement,
				{
					$contractId: contractId,
					$recognizedOn: asOf, // to SQL Date
				},
			);
		} catch (error) {
			throw new SQLException(
				(error as Error).message,
				RecognitionsGateway.findRecognitionsStatement,
			);
		}
		return resultSet;
	}

	private static insertRecognitionStatement =
		'INSERT INTO revenue_recognitions ' +
		'(contract_id,amount,recognized_on) ' +
		'VALUES ($contractId, $amount, $recognizedOn); ';
	async insertRecognition(
		contractId: number,
		amount: number,
		asOf: number | string | Dayjs,
	) {
		try {
			return await this.connection.run(
				RecognitionsGateway.insertRecognitionStatement,
				{
					$contractId: contractId,
					$amount: amount,
					$recognizedOn: asOf, // to SQL Date
				},
			);
		} catch (error) {
			throw new SQLException(
				(error as Error).message,
				RecognitionsGateway.insertRecognitionStatement,
			);
		}
	}
}

export class ContractsGateway {
	connection: DB;
	constructor(connection: DB) {
		this.connection = connection;
	}
	private static findContractByIdStatement =
		'SELECT c.contract_id, c.product_id, c.revenue, c.date_signed, p.type ' +
		'FROM contracts c ' +
		'JOIN products p on c.product_id = p.product_id ' +
		'WHERE contract_id = $contractId;';
	async findContract(contractId: number) {
		try {
			return await this.connection.get<SQLContract>(
				ContractsGateway.findContractByIdStatement,
				{
					$contractId: contractId,
				},
			);
		} catch (error) {
			throw new SQLException(
				(error as Error).message,
				ContractsGateway.findContractByIdStatement,
			);
		}
	}
}

export class RecognitionsService {
	recognitionsGateway: RecognitionsGateway;
	contractsGateway: ContractsGateway;
	constructor(
		recognitionsGateway: RecognitionsGateway,
		contractsGateway: ContractsGateway,
	) {
		this.recognitionsGateway = recognitionsGateway;
		this.contractsGateway = contractsGateway;
	}
	async recognizedRevenue(
		contractNumber: number,
		asOf: number | string | Dayjs,
	) {
		let result = 0;
		let resultSet;
		try {
			resultSet = await this.recognitionsGateway.findRecognitionsFor(
				contractNumber,
				dayjs(asOf).format('YYYY-MM-DD'),
			);
		} catch (error) {
			throw new ApplicationException((error as Error).message);
		}
		resultSet.forEach(({ amount }) => {
			result = currency(result).add(amount).value;
		});

		return result;
	}
	async calculateRevenueRecognitions(contractNumber: number) {
		let contract;
		try {
			contract = await this.contractsGateway.findContract(contractNumber);

			let totalRevenue = currency(contract.revenue);
			let recognitionDate = dayjs(contract.date_signed);
			let type = contract.type;

			switch (type) {
				case 'Sheets': {
					const [first, second, third] = totalRevenue.distribute(3);
					const status1 = await this.recognitionsGateway.insertRecognition(
						contractNumber,
						first.value,
						recognitionDate.format('YYYY-MM-DD'),
					);
					const status2 = await this.recognitionsGateway.insertRecognition(
						contractNumber,
						second.value,
						recognitionDate.add(60, 'day').format('YYYY-MM-DD'),
					);
					const status3 = await this.recognitionsGateway.insertRecognition(
						contractNumber,
						third.value,
						recognitionDate.add(90, 'day').format('YYYY-MM-DD'),
					);

					break;
				}
				case 'WordProcessor':
					await this.recognitionsGateway.insertRecognition(
						contractNumber,
						totalRevenue.value,
						recognitionDate.format('YYYY-MM-DD'),
					);
					break;
				case 'DBMS': {
					const [first, second, third] = totalRevenue.distribute(3);
					await this.recognitionsGateway.insertRecognition(
						contractNumber,
						first.value,
						recognitionDate.format('YYYY-MM-DD'),
					);
					await this.recognitionsGateway.insertRecognition(
						contractNumber,
						second.value,
						recognitionDate.add(30, 'day').format('YYYY-MM-DD'),
					);
					await this.recognitionsGateway.insertRecognition(
						contractNumber,
						third.value,
						recognitionDate.add(60, 'day').format('YYYY-MM-DD'),
					);
					break;
				}
				default:
					throw new Error(
						'calculateRevenueRecognitions: type of product is not found',
					);
			}
		} catch (error) {
			throw new ApplicationException((error as Error).message);
		}
	}
}
