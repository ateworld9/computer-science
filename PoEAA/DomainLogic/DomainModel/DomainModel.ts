import dayjs, { Dayjs } from 'dayjs';
import currency from 'currency.js';

export class RevenueRecognition {
	private amount: number;
	private date: Dayjs;
	constructor(amount: number, date: number | string | Dayjs) {
		this.amount = amount;
		this.date = dayjs(date);
	}
	getAmount() {
		return this.amount;
	}
	isRecognizableBy(asOf: number | string) {
		const asOfDate = dayjs(asOf);
		return asOfDate.valueOf() >= this.date.valueOf();
	}
}

export class Contract {
	private id: number | undefined;
	private product: Product;
	private revenue: number;
	private whenSigned: number | string;
	private revenueRecognitions: RevenueRecognition[];

	constructor(product: Product, revenue: number, whenSigned: number | string) {
		this.product = product;
		this.revenue = revenue;
		this.whenSigned = whenSigned;
		this.revenueRecognitions = [];
	}
	getId() {
		return this.id;
	}
	getRevenue() {
		return this.revenue;
	}
	getWhenSigned() {
		return this.whenSigned;
	}
	getRevenueRecognitions() {
		return this.revenueRecognitions;
	}
	addRevenueRecognition(revenueRecognition: RevenueRecognition) {
		this.revenueRecognitions.push(revenueRecognition);
	}
	recognizedRevenue(asOf: number | string) {
		return this.revenueRecognitions
			.filter((recognition) => recognition.isRecognizableBy(asOf))
			.reduce(
				(acc, curRevenue) => currency(acc).add(curRevenue.getAmount()).value,
				0,
			);
	}
	calculateRecognitions() {
		this.product.calculateRevenueRecognitions(this);
	}
}

export class Product {
	private name: string;
	private recognitionStrategy: RecognitionStrategy;

	constructor(name: string, recognitionStrategy: RecognitionStrategy) {
		this.name = name;
		this.recognitionStrategy = recognitionStrategy;
	}
	static newWordProcessor(name: string) {
		return new Product(name, new CompleteRecognitionStrategy());
	}
	static newSheets(name: string) {
		return new Product(name, new ThreeWayRecognitionStrategy(60, 90));
	}
	static newDBMS(name: string) {
		return new Product(name, new ThreeWayRecognitionStrategy(30, 60));
	}

	calculateRevenueRecognitions(contract: Contract) {
		this.recognitionStrategy.calculateRevenueRecognitions(contract);
	}
}
export interface RecognitionStrategy {
	// abstract
	calculateRevenueRecognitions: (contract: Contract) => void;
}

export class CompleteRecognitionStrategy implements RecognitionStrategy {
	calculateRevenueRecognitions(contract: Contract) {
		contract.addRevenueRecognition(
			new RevenueRecognition(contract.getRevenue(), contract.getWhenSigned()),
		);
	}
}
export class ThreeWayRecognitionStrategy implements RecognitionStrategy {
	private firstRecognitionOffset: number;
	private secondRecognitionOffset: number;
	constructor(firstRecognitionOffset: number, secondRecognitionOffset: number) {
		this.firstRecognitionOffset = firstRecognitionOffset;
		this.secondRecognitionOffset = secondRecognitionOffset;
	}
	calculateRevenueRecognitions(contract: Contract) {
		const [first, second, third] = currency(contract.getRevenue()).distribute(
			3,
		);
		contract.addRevenueRecognition(
			new RevenueRecognition(first.value, contract.getWhenSigned()),
		);
		contract.addRevenueRecognition(
			new RevenueRecognition(
				second.value,
				dayjs(contract.getWhenSigned()).add(
					this.firstRecognitionOffset,
					'days',
				),
			),
		);
		contract.addRevenueRecognition(
			new RevenueRecognition(
				third.value,
				dayjs(contract.getWhenSigned()).add(
					this.secondRecognitionOffset,
					'days',
				),
			),
		);
	}
}
