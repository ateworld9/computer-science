import { SQLException } from '../../ObjRelDataSource/SQLException.mjs';
import { ApplicationException } from '../../errors/ApplicationException.mjs';

class RecognitionsGateway {
	constructor(connection) {
		this.connection = connection;
	}
	static findRecognitionsStatement =
		'SELECT amount ' +
		'FROM revenue_recognitions ' +
		'WHERE contract_id = $contractId AND recognized_on <= $recognizedOn';
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
		'VALUES ($contractId, $amount, $recognizedOn) ';
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
			throw new SQLException(error);
		}
	}
}

class ContractGateway {
	constructor(connection) {
		this.connection = connection;
	}
	static findContractByIdStatement =
		'SELECT contract_id, product_id, revenue, date_signed ' +
		'FROM contracts c ' +
		'JOIN products p c.product_id = p.product_id' +
		'WHERE contract_id = $contractId';
	async findContract(contractId) {
		try {
			return await this.connection.get(
				ContractGateway.findContractByIdStatement,
				{
					$contractId: contractId,
				},
			);
		} catch (error) {
			throw SQLException(
				error.message,
				ContractGateway.findContractByIdStatement,
			);
		}
	}
}

class RecognitionsService {
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
				asOf,
			);
		} catch (error) {
			throw new ApplicationException(error);
		}
		resultSet.forEach((row) => {
			result.add(row.amount);
		});
	}
	async calculateRevenueRecognitions(contractNumber) {
		let contract;
		try {
			contract = await this.contractsGateway.findContract(contractNumber);
		} catch (error) {
			throw new ApplicationException(error);
		}

		let totalRevenue = contract.revenue;
		let recognitionDate = new Date(contract.date_signed);
		let type = contract.type;

		if (type === 'S') {
			await this.recognitionsGateway.insertRecognition(
				contractNumber,
				totalRevenue,
				recognitionDate,
			);
			await this.recognitionsGateway.insertRecognition(
				contractNumber,
				totalRevenue,
				recognitionDate + 60, // + 60 days
			);
			await this.recognitionsGateway.insertRecognition(
				contractNumber,
				totalRevenue,
				recognitionDate + 90, // + 90 days
			);
		}
		if (type === 'W') {
			await this.recognitionsGateway.insertRecognition(
				contractNumber,
				totalRevenue,
				recognitionDate,
			);
		}
		if (type === 'D') {
			await this.recognitionsGateway.insertRecognition(
				contractNumber,
				totalRevenue,
				recognitionDate,
			);
			await this.recognitionsGateway.insertRecognition(
				contractNumber,
				totalRevenue,
				recognitionDate + 30, //
			);
			await this.recognitionsGateway.insertRecognition(
				contractNumber,
				totalRevenue,
				recognitionDate,
			);
		}
	}
}
