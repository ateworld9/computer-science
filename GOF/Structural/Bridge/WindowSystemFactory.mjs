export class WindowSystemFactory {
	constructor() {
		this.instance;
	}

	makeWindowImp() {
		return;
	}

	static Instance() {
		if (this.instance === undefined) {
			this.instance = new WindowSystemFactory();
		}
		return this.instance;
	}
}
