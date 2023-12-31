import { Point } from '../Point.mjs';
import { Shape } from '../Shape.mjs';
import { TextManipulator } from '../TextManipulator.mjs';
import { TextView } from '../TextView.mjs';

export class TextShape extends TextView /* Shape */ {
  constructor() {
    super();
  }

  boundingBox() {
    const { x: bottom, y: left } = this.getOrigin();
    const { width, height } = this.getExtent();

    return {
      bottomLeft: new Point(bottom, left),
      topRight: new Point(bottom + height, left + width),
    };
  }

  createManipulator() {
    return new TextManipulator(this);
  }
}
