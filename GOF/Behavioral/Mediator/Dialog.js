// Abstract Class
class DialogDirector {
	constructor() {}
	createWidgets() {}

	showDialog() {}
	widgetChanged(widget) {}
}

// Abstract class
class Widget {
	constructor(dialogDirector) {
		this.director = dialogDirector;
	}
	changed() {
		this.director.widgetChanged(this);
	}

	handleMouse(event) {}
	// ...
}

class ListBox extends Widget {
	constructor(dialogDirector) {
		super(dialogDirector);
	}

	getSelection() {}
	setList(list) {}
	handleMouse(event) {}
	// ...
}

class EntryField extends Widget {
	constructor(dialogDirector) {
		super(dialogDirector);
	}

	setText(text) {}
	getText() {}
	handleMouse(event) {}
	// ...
}

class Button extends Widget {
	constructor(dialogDirector) {
		super(dialogDirector);
	}

	setText() {}
	handleMouse(event) {
		// ...
		this.changed();
	}
}

class FontDialogDirector extends DialogDirector {
	constructor() {
		super();
		this.okButton;
		this.cancelButton;
		this.fontList;
		this.fontName;
	}

	widgetChanged(changedWidget) {
		if (changedWidget == this.fontList) {
			this.fontName.setText(this.fontList.getSelection());
		} else if (changedWidget == this.okButton) {
			// Изменить шрифт и уничтожить диалоговое окно
			// ...
		} else if (changedWidget == this.cancelButton) {
			// Закрыть диалог
		}
	}

	createWidgets() {
		this.okButton = new Button(this);
		this.cancelButton = new Button(this);
		this.fontList = new ListBox(this);
		this.fontName = new EntryField(this);

		// Поместить в список названия шрифтов

		// Разместить все виджеты в диалоговом окне
	}
}
