export class Franc {
	constructor(private readonly amount: number) {}

	static isFranc(obj: unknown): obj is Franc {
		return (obj as Franc).amount !== undefined;
	}

	times(multiplier: number) {
		return new Franc(this.amount * multiplier);
	}

	/** TODO */
	equals(object: any) {
		// validate object is Franc
		return this.amount === object.amount;
	}

	/** TODO */
	hashCode() {}
}
