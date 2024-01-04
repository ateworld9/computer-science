export class TextView {
	constructor() {
		this.x = 1;
		this.y = 2;
		this.width = 3;
		this.height = 4;
	}

	getOrigin() {
		return { x: this.x, y: this.y };
	}
	getExtent() {
		return { width: this.width, height: this.height };
	}
	isEmpty() {
		return this.width === 0 || this.height === 0;
	}
}
