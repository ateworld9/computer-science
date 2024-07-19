import currency from 'currency.js';
import dayjs from 'dayjs';

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

interface SQLProduct {
	name: string;
	type: string;
}

interface DataSet {
	contracts: SQLContract[];
	revenue_recognitions: SQLRecognition[];
	products: SQLProduct[];
}

type TableNamesUnion = keyof DataSet;

export class TableModule<T extends TableNamesUnion> {
	dataSet: DataSet;
	table: DataSet[T];
	constructor(dataSet: DataSet, tableName: T) {
		this.dataSet = dataSet;
		this.table = dataSet[tableName];
	}
}

export class ContractModule extends TableModule<'contracts'> {
	constructor(dataSet: DataSet) {
		super(dataSet, 'contracts');
	}
	getContract(contractId: number) {
		return this.table.find((contract) => contract.contract_id == contractId);
	}

	calculateRecognitions(contractId: number) {
		const contractRow = this.getContract(contractId);
		if (contractRow === undefined) {
			throw new Error(`contract: contract_id${contractId} is not found`);
		}

		const revenueRecognition = new RevenueRecognitionModule(this.dataSet); // ????
		const product = new ProductModule(this.dataSet); // ????

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

export class ProductModule extends TableModule<'products'> {
	constructor(dataSet: DataSet) {
		super(dataSet, 'products');
	}
	getProduct(productId: number) {
		return this.table.find((product) => product.product_id == productId);
	}
	getProductType(productId: number) {
		return this.table.find((product) => product.product_id == productId).type;
	}
}
export class RevenueRecognitionModule extends TableModule<'revenue_recognitions'> {
	constructor(dataSet: DataSet) {
		super(dataSet, 'revenue_recognitions');
	}
	insert(contractId: number, amount: number, date) {}
	recognizedRevenue() {}
}
