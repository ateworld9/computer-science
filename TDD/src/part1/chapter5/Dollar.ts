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
