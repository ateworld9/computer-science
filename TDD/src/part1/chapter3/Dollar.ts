/**
 * TODO:
 * $5 + 10CHF = $10, если курс обмена 2:1
 * DONE $5 * 2 = $10
 * Сделать переменную amount закрытым членом класса
 * DONE Побочные эффекты в классе Dollar?
 * Округление денежных величин?
 * CURRENTLY DONE equals()
 * hashCode()
 * Равенство значению null
 * Равенство объектов
 */

export class Dollar {
	amount: number;
	constructor(amount: number) {
		this.amount = amount;
	}

	times(multiplier: number) {
		return new Dollar(this.amount * multiplier);
	}

	/** TODO */
	equals(object: any) {
		// validate object is Dollar
		return this.amount === object.amount;
	}

	/** TODO */
	hashCode() {}
}
