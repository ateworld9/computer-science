import { WindowSystemFactory } from './WindowSystemFactory.mjs';

export class Window {
	constructor(contents) {
		this.implementation;
		this.contents = contents;
	}

	// requests handled by window
	drawContents() {
		throw new Error('Window.drawContents is not implemented');
	}

	open() {
		throw new Error('Window.open is not implemented');
	}
	close() {
		throw new Error('Window.close is not implemented');
	}
	iconify() {
		throw new Error('Window.iconify is not implemented');
	}
	deconify() {
		throw new Error('Window.deconify is not implemented');
	}

	// requests forwarded to implementation
	setOrigin() {
		throw new Error('Window.setOrigin is not implemented');
	}
	setExtent() {
		throw new Error('Window.setExtent is not implemented');
	}
	raise() {
		throw new Error('Window.raise is not implemented');
	}
	lower() {
		throw new Error('Window.lower is not implemented');
	}

	drawLine() {}
	drawRect(p1, p2) {
		const imp = this.getWindowImp();
		imp.deviceRec(p1.x, p1.y, p2.x, p2.y);
	}
	drawPolygon() {}
	drawText() {}

	getWindowImp() {
		if (this.implementation === undefined) {
			this.implementation = WindowSystemFactory.Instance().makeWindowImp();
		}
		return this.implementation;
	}
	getView() {}
}
