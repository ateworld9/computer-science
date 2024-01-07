[Паттерны](../../Patterns.md)

# Mediator

tags:

- #architecture
- #behavioral
- #coupling

**Назначение**: Определяет объект инкапсулирующий способ взаимодействия множества объектов. _Mediator_ обеспечивает слабую связанность, избавляя объекты от необходимости явно ссылаться друг на друга и позволяя тем самым независимо изменять взаимодействия между ними.

**Применимость**:

- Существование объектов, связи между которыми сложны и четко определены. Получающиеся при этом взаимозависимости не структурированы и трудны для понимания.

- Повторное использование объекта затруднено, поскольку он обменивается информацией со многими другими объектами.

- Поведение, распределенное между несколькими классами, должно настраиваться без порождения множества классов.

**Структура**:

![Mediator](./Mediator.png)

Типичная структура объектов:

![Mediator Structure](./Mediator_Structure.png)

**Результаты**:

- Снижение числа порождаемых подклассов.  
  Посредник локализует поведение, которое в противном случа пришлось бы распределять между несколькими объектами. Для изменения поведения нужно породить подклассы только от класса посредника _Mediator_, классы коллег _Colleague_ можно использовать повторно без каких либо изменений.

- Ослабление связей между коллегами.  
  Посредник обеспечивает слабую связанность(coupling) коллег. Изменять классы _Colleague_ и _Mediator_ можно независимо друг от друга.

- Упрощение протоколов взаимодействия объектов.  
  _Mediator_ заменяет взаимодействия "все со всеми" взаимодействиями "один со всеми", то есть один посредник взаимодействует со всеми коллегами. Отношения вида "один ко многим" проще для понимания, сопровождения и расширения.

- Абстрагирование способа кооперирования объектов. Выделение механизма посредничества в отдельную концепцию и инкапсуляция ее в одном объекте позволяет сосредоточится именно на взаимодействии объектов, а не на их индивидуальном поведении. Это способствует прояснению имеющихся в системе взаимодействий.

- Централизация управления. Паттерн _Mediator_ заменяет сложность взаимодействия сложностью класса-посредника. Поскольку посредник инкапсулирует протоколы, то он может быть сложнее отдельных коллег. **В результате сам посредник превращается в монолит, который трудно сопровождать**.

**Реализация**:

<details>
    <summary>Code Example</summary>

```js
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
```

</details>
