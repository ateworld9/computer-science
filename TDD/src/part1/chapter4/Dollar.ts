/**
 * TODO:
 * $5 + 10CHF = $10, если курс обмена 2:1
 * DONE $5 * 2 = $10
 * CURRENTLY DONE Сделать переменную amount закрытым членом класса
 * DONE Побочные эффекты в классе Dollar?
 * Округление денежных величин?
 * DONE equals()
 * hashCode()
 * Равенство значению null
 * Равенство объектов
 */
export class Dollar {
	constructor(private readonly amount: number) {}

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
