export class Shape {
  constructor() {}

  boundingBox(bottomLeftPoint, topRightPoint) {
    throw new Error('Shape.boundingBox is not implemented');
  }
  createManipulator() {
    throw new Error('Shape.createManipulator is not implemented');
  }
}
