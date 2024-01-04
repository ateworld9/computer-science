const NO_HELP_TOPIC = -1;
const PRINT_TOPIC = 1;
const PAPER_ORIENTATION_TOPIC = 2;
const APPLICATION_TOPIC = 3;

class HelpHandler {
	constructor(helpHandler = 0, topic = NO_HELP_TOPIC) {
		this.successor = helpHandler;
		this.topic = topic;
	}

	hasHelp() {
		return this.topic !== NO_HELP_TOPIC;
	}
	setHandler(handler) {
		this.successor = handler;
	}
	handleHelp() {
		if (this.successor !== 0) {
			this.successor.handleHelp();
		}
	}
}

class Widget extends HelpHandler {
	constructor(widget, topic = NO_HELP_TOPIC) {
		super(widget, topic);
		this.parent = widget;
	}

	handleHelp() {
		if (this.hasHelp()) {
			console.log(this.topic);
		} else {
			const proto = Object.getPrototypeOf(this);
			proto.handleHelp();
		}
	}
}

class Button extends Widget {
	constructor(widget, topic = NO_HELP_TOPIC) {
		super(widget, topic);
	}

	handleHelp() {
		if (this.hasHelp()) {
			console.log(this.topic);
		} else {
			const proto = Object.getPrototypeOf(this);
			proto.handleHelp();
		}
	}
}

class Dialog extends Widget {
	constructor(widget, topic = NO_HELP_TOPIC) {
		super(widget, topic);
	}
	handleHelp() {
		if (this.hasHelp()) {
			console.log(this.topic);
		} else {
			const proto = Object.getPrototypeOf(this);
			proto.handleHelp();
		}
	}
}

class Application extends HelpHandler {
	constructor(topic) {
		super(0, topic);
	}

	handleHelp() {
		// показать список разделов справки
	}
}

const application = new Application(APPLICATION_TOPIC);
const dialog = new Dialog(application, PRINT_TOPIC);
const button = new Button(dialog, PAPER_ORIENTATION_TOPIC);

button.handleHelp();
