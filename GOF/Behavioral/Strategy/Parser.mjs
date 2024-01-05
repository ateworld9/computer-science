class Composition {
	constructor(compositor) {
		this.compositor = compositor;
		this.components; // Список компонентов
		this.componentCount; // Количество компонентов
		this.lineWidth; // Ширина строки в композиции
		this.lineBreaks; // Позиции точек разбиения строки
		this.lineCount; // Количество строк
	}

	repair() {
		let natural;
		let stretchablity;
		let shrinkability;
		let componentCount;
		let breaks;

		// Подготовить массивы с желательными размерами компонентов
		// ...

		// Определить, где должны находиться точки разбиения
		let breakCount = this.compositor.compose(
			natural,
			stretchablity,
			shrinkability,
			componentCount,
			this.lineWidth,
			breaks,
		);

		// Разместить компоненты с учетом точек разбиения
		// ...
	}
}

class Compositor {
	constructor() {}

	compose(natural, stretch, shrink, componentCount, lineWidth, breaks) {}
	// ...
}

class SimpleCompositor extends Compositor {
	constructor() {
		super();
	}
	compose(natural, stretch, shrink, componentCount, lineWidth, breaks) {}
}

class TeXCompositor extends Compositor {
	constructor() {
		super();
	}
	compose(natural, stretch, shrink, componentCount, lineWidth, breaks) {}
}

class ArrayCompositor extends Compositor {
	constructor() {
		super();
	}
	compose(natural, stretch, shrink, componentCount, lineWidth, breaks) {}
}

const quick = new Composition(new SimpleCompositor());
const slick = new Composition(new TeXCompositor());
const iconic = new Composition(new ArrayCompositor());
