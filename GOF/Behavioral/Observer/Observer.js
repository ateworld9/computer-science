class AbstractObserver {
	update() {
		throw new Error('Observer.update is not implemented');
	}
}

class AbstractSubject {
	constructor() {
		this.observers = new Set();
	}
	attach(observer) {
		this.observers.add(observer);
	}
	detach(observer) {
		this.observers.delete(observer);
	}
	notify() {
		for (const observer of this.observers) {
			observer.update(this);
		}
	}
}

class ClockTimer extends AbstractSubject {
	constructor() {
		super();
		this.time = new Date(Date.now());
		this.interval = setInterval(() => {
			this.time = new Date(Date.now());
			this.tick();
		}, 1000);
	}

	getHours() {
		return this.time.getHours();
	}
	getMinutes() {
		return this.time.getMinutes();
	}
	getSeconds() {
		return this.time.getSeconds();
	}
	getTime() {
		return this.time.getTime();
	}

	destroy() {
		clearInterval(this.interval);
	}

	tick() {
		this.notify();
	}
}

class DigitalClock extends AbstractObserver {
	constructor(timer) {
		super();
		this.subject = timer;
		this.subject.attach(this);
	}
	destroy() {
		this.subject.detach(this);
	}

	update(changedSubject) {
		if (changedSubject === this.subject) {
			this.draw();
		}
	}

	draw() {
		console.log(
			'Digital:' +
				this.subject.getHours() +
				':' +
				this.subject.getMinutes() +
				':' +
				this.subject.getSeconds(),
		);
	}
}

class AnalogClock extends AbstractObserver {
	constructor(timer) {
		super();
		this.subject = timer;
		this.subject.attach(this);
	}
	destroy() {
		this.subject.detach(this);
	}

	update(changedSubject) {
		if (changedSubject === this.subject) {
			this.draw();
		}
	}

	draw() {
		console.log('Analogue: ', this.subject.getTime());
	}
}

const clockTimer = new ClockTimer();

const digitalClock = new DigitalClock(clockTimer);
const analogClock = new AnalogClock(clockTimer);

clockTimer.tick();
