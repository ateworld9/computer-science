class Graphic {}
// Базовый класс графических объектов

class MoveCommand {
	constructor(target, delta) {
		this.state;
		this.delta = delta;
		this.target = target;
	}
	execute() {
		const solver = ConstraintSolver.Instance();
		this.state = solver.createMemento();
		// Создание хранителя
		this.target.move(this.delta);
		solver.solve();
	}
	unexecute() {
		const solver = ConstraintSolver.Instance();
		this.target.move(-this.delta);
		solver.setMemento(this.state);
		// Восстановление состояния
		solver.solve();
	}
}

class ConstraintSolver {
	constructor() {}

	instance = null;
	static Instance() {
		if (ConstraintSolver.instance === null) {
			ConstraintSolver.instance = new ConstraintSolver();
		}
		return ConstraintSolver.instance;
	}

	solve() {}
	addConstraint(startConnection, endConnection) {}
	removeConstraint(startConnection, endConnection) {}

	createMemento() {}
	setMemento() {}
}

class ConstraintSolverMemento {
	constructor() {}
}
