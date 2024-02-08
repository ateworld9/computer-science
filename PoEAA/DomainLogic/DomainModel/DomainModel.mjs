import dayjs from 'dayjs';
import currency from 'currency.js';

export class RevenueRecognition {
	#amount;
	#date;
	constructor(amount, date) {
		this.#amount = amount;
		this.#date = dayjs(date);
	}
	get amount() {
		return this.#amount;
	}
	isRecognizableBy(asOf) {
		const asOfDate = dayjs(asOf);
		return asOfDate.valueOf() >= this.#date.valueOf();
	}
}

export class Contract {
	#id;
	#product;
	#revenue;
	#whenSigned;
	constructor(product, revenue, whenSigned) {
		this.#product = product;
		this.#revenue = revenue;
		this.#whenSigned = whenSigned;
	}
	get revenue() {
		return this.#revenue;
	}
	get whenSigned() {
		return this.#whenSigned;
	}
	#revenueRecognitions = [];
	get revenueRecognitions() {
		return this.#revenueRecognitions;
	}
	addRevenueRecognition(revenueRecognition) {
		this.#revenueRecognitions.push(revenueRecognition);
	}
	recognizedRevenue(asOf) {
		return this.#revenueRecognitions
			.filter((recognition) => recognition.isRecognizableBy(asOf))
			.reduce(
				(acc, curRevenue) => currency(acc).add(curRevenue.amount).value,
				0,
			);
	}
	calculateRecognitions() {
		this.#product.calculateRevenueRecognitions(this);
	}
}

export class Product {
	#name;
	#recognitionStrategy;

	constructor(name, recognitionStrategy) {
		this.#name = name;
		this.#recognitionStrategy = recognitionStrategy;
	}
	static newWordProcessor(name) {
		return new Product(name, new CompleteRecognitionStrategy());
	}
	static newSheets(name) {
		return new Product(name, new ThreeWayRecognitionStrategy(60, 90));
	}
	static newDBMS(name) {
		return new Product(name, new ThreeWayRecognitionStrategy(30, 60));
	}

	calculateRevenueRecognitions(contract) {
		this.#recognitionStrategy.calculateRevenueRecognitions(contract);
	}
}
export class RecognitionStrategy {
	calculateRevenueRecognitions(contract) {
		throw new Error(
			'RecognitionStrategy calculateRevenueRecognitions is not implemented',
		);
	}
}
export class CompleteRecognitionStrategy extends RecognitionStrategy {
	constructor() {
		super();
	}
	calculateRevenueRecognitions(contract) {
		contract.addRevenueRecognition(
			new RevenueRecognition(contract.revenue, contract.whenSigned),
		);
	}
}
export class ThreeWayRecognitionStrategy extends RecognitionStrategy {
	#firstRecognitionOffset;
	#secondRecognitionOffset;
	constructor(firstRecognitionOffset, secondRecognitionOffset) {
		super();
		this.#firstRecognitionOffset = firstRecognitionOffset;
		this.#secondRecognitionOffset = secondRecognitionOffset;
	}
	calculateRevenueRecognitions(contract) {
		const [first, second, third] = currency(contract.revenue).distribute(3);
		contract.addRevenueRecognition(
			new RevenueRecognition(first.value, contract.whenSigned),
		);
		contract.addRevenueRecognition(
			new RevenueRecognition(
				second.value,
				dayjs(contract.whenSigned).add(this.#firstRecognitionOffset, 'days'),
			),
		);
		contract.addRevenueRecognition(
			new RevenueRecognition(
				third.value,
				dayjs(contract.whenSigned).add(this.#secondRecognitionOffset, 'days'),
			),
		);
	}
}
