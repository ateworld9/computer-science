import currency from 'currency.js';
import dayjs from 'dayjs';

import { SQLException } from '../../errors/SQLException.mjs';
import { ApplicationException } from '../../errors/ApplicationException.mjs';

export class RecognitionsGateway {
	constructor(connection) {
		this.connection = connection;
	}
	static findRecognitionsStatement =
		'SELECT amount ' +
		'FROM revenue_recognitions ' +
		'WHERE contract_id = $contractId ' +
		'AND recognized_on <= $recognizedOn ;';
	async findRecognitionsFor(contractId, asOf) {
		let resultSet;
		try {
			resultSet = await this.connection.all(
				RecognitionsGateway.findRecognitionsStatement,
				{
					$contractId: contractId,
					$recognizedOn: asOf, // to SQL Date
				},
			);
		} catch (error) {
			throw new SQLException(error.message);
		}
		return resultSet;
	}

	static insertRecognitionStatement =
		'INSERT INTO revenue_recognitions ' +
		'(contract_id,amount,recognized_on) ' +
		'VALUES ($contractId, $amount, $recognizedOn); ';
	async insertRecognition(contractId, amount, asOf) {
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
				error.message,
				RecognitionsGateway.insertRecognitionStatement,
			);
		}
	}
}

export class ContractsGateway {
	constructor(connection) {
		this.connection = connection;
	}
	static findContractByIdStatement =
		'SELECT c.contract_id, c.product_id, c.revenue, c.date_signed, p.type ' +
		'FROM contracts c ' +
		'JOIN products p on c.product_id = p.product_id ' +
		'WHERE contract_id = $contractId;';
	async findContract(contractId) {
		try {
			return await this.connection.get(
				ContractsGateway.findContractByIdStatement,
				{
					$contractId: contractId,
				},
			);
		} catch (error) {
			throw new SQLException(
				error.message,
				ContractsGateway.findContractByIdStatement,
			);
		}
	}
}

export class RecognitionsService {
	constructor(recognitionsGateway, contractsGateway) {
		this.recognitionsGateway = recognitionsGateway;
		this.contractsGateway = contractsGateway;
	}
	async recognizedRevenue(contractNumber, asOf) {
		let result = 0;
		let resultSet;
		try {
			resultSet = await this.recognitionsGateway.findRecognitionsFor(
				contractNumber,
				dayjs(asOf).format('YYYY-MM-DD'),
			);
		} catch (error) {
			throw new ApplicationException(error);
		}
		resultSet.forEach(({ amount }) => {
			result = currency(result).add(amount).value;
		});

		return result;
	}
	async calculateRevenueRecognitions(contractNumber) {
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
			throw new ApplicationException(error);
		}
	}
}
