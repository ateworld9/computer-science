class VisualComponent {
	constructor() {}
	draw() {}
	resize() {}
	// ...
}

class Decorator extends VisualComponent {
	constructor(component) {
		super();
		this.component = component;
	}

	draw() {
		this.component.draw();
	}
	resize() {
		this.component.resize();
	}
}

class BorderedDecorator extends Decorator {
	constructor(component, width) {
		super(component);
		this.width = width;
	}

	drawBorder(width) {}

	draw() {
		this.component.draw();
		this.drawBorder(this.width);
	}
}

class ScrollDecorator extends Decorator {}
class DropShadowDecorator extends Decorator {}

// Usage (Compose)

class Window {
	// ...
	setContents(component) {}
	// ...
}
class TextView extends VisualComponent {
	constructor() {
		super();
	}
}

const window = new Window();
const textView = new TextView();

// default
window.setContents(textView);

// with Scroll and Border
window.setContents(new BorderedDecorator(new ScrollDecorator(textView), 1));
