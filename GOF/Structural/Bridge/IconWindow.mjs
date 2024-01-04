import { Window } from './Window.mjs';

class IconWindow extends Window {
	constructor() {
		super();
		this.bitmapName = '';
	}

	drawContents() {
		const imp = this.getWindowImp();
		if (imp) {
			imp.deviceBitmap(this.bitmapName, 0, 0);
		}
	}
}
