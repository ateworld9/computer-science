export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(point) {
    return new Point(this.x + point.x, this.y + point.y);
  }
  minus(point) {
    return new Point(this.x - point.x, this.y - point.y);
  }
  multiply(multiplier) {
    return new Point(this.x * multiplier, this.y * multiplier);
  }
  divide(divider) {
    return new Point(this.x / divider, this.y / divider);
  }
}
