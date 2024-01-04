import { Point } from '../../../Base/Point.mjs';
import { Shape } from '../Shape.mjs';
import { TextManipulator } from '../TextManipulator.mjs';

export class TextShape extends Shape {
	constructor(textView) {
		super();
		this.textView = textView;
	}

	boundingBox() {
		const { x: bottom, y: left } = this.textView.getOrigin();
		const { width, height } = this.textView.getExtent();

		return {
			bottomLeft: new Point(bottom, left),
			topRight: new Point(bottom + height, left + width),
		};
	}

	createManipulator() {
		return new TextManipulator();
	}
}
