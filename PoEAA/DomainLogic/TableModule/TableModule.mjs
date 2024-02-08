import currency from 'currency.js';
import dayjs from 'dayjs';

export class TableModule {
	constructor(dataSet, tableName) {
		this.dataSet = dataSet;
		this.table = dataSet[tableName];
	}
}

export class Contract extends TableModule {
	constructor(dataSet) {
		super(dataSet, 'contracts');
	}
	getContract(contractId) {
		return this.table.find((contract) => contract.contract_id == contractId);
	}

	calculateRecognitions(contractId) {
		const contractRow = this.getContract(contractId);
		if (contractRow === undefined) {
			throw new Error(`contract: contract_id${contractId} is not found`);
		}

		const revenueRecognition = new RevenueRecognition(this.dataSet); // ????
		const product = new Product(this.dataSet); // ????

		const contractType = product.getProductType(contractRow.product_id);
		const amount = currency(contractRow.amount);
		const recognitionDate = dayjs(contractRow.date_signed);

		switch (contractType) {
			case 'Sheets': {
				const [first, second, third] = amount.distribute(3);
				revenueRecognition.insert(
					contractId,
					first.value,
					recognitionDate.format('YYYY-MM-DD'),
				);
				revenueRecognition.insert(
					contractId,
					second.value,
					recognitionDate.add(60, 'day').format('YYYY-MM-DD'),
				);
				revenueRecognition.insert(
					contractId,
					third.value,
					recognitionDate.add(90, 'day').format('YYYY-MM-DD'),
				);
				break;
			}
			case 'WordProcessor':
				revenueRecognition.insert(
					contractId,
					amount.value,
					recognitionDate.format('YYYY-MM-DD'),
				);
				break;
			case 'DBMS': {
				const [first, second, third] = amount.distribute(3);
				revenueRecognition.insert(
					contractId,
					first.value,
					recognitionDate.format('YYYY-MM-DD'),
				);
				revenueRecognition.insert(
					contractId,
					second.value,
					recognitionDate.add(30, 'day').format('YYYY-MM-DD'),
				);
				revenueRecognition.insert(
					contractId,
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
	}
}

export class Product extends TableModule {
	constructor(dataSet) {
		super(dataSet, 'contracts');
	}
	getProduct(productId) {
		return this.table.find((product) => product.product_id == productId);
	}
	getProductType(productId) {
		return this.table.find((product) => product.product_id == productId).type;
	}
}
export class RevenueRecognition extends TableModule {
	constructor(dataSet) {
		super(dataSet, 'contracts');
	}
	insert(contractId, amount, date) {}
	recognizedRevenue() {}
}
