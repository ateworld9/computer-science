[База знаний](../README.md)

# React

[useCallback](./useCallback.md)

<!-- БАГАЖНИК -->

## React Learn Docs

Если двойные фигурные скобки после person= вас смущают, вспомните они просто объект внутри JSX-скобок.

props являются иммутабельными

React рассматривает false как “пустое место” в дереве JSX, прямо как null или undefined, и ничего не рендерит на этом месте.
Следовательно логическое выражение должно возвращать null, undefined или false
Чтобы исправить это, сделайте левую часть булевым значением.

- Дерево рендеринга
- Дерево зависимостей

## Adding Interactivity

По традиции, принято называть обработчики событий handle, за которым следует имя события. Часто можно встретить onClick={handleClick}, onMouseEnter={handleMouseEnter} и так далее.

onAction - внешний интерфейс компонента

### State

Локальные переменные:

- Локальные переменные не сохраняются между рендерами.
- Изменения локальных переменных не вызывают рендеринга.

Для update компонента с новыми данными, должно произойти две вещи:

- **Retain** (Сохранение) данных между рендерами
- **Trigger** React для рендеринга компонента с новыми данными (ре-рендеринг).

Хук useState предоставляет следующие две вещи:

- **State variable** - сохраняет(**_retain_**) данные между рендерингами.
- Функция **state setter** - обновления переменную и **_trigger_**ит ре-рендер.

### Render And Commit

Процесс запроса и подачи пользовательского интерфейса состоит из трех этапов:

1. Триггер рендеринга
2. Рендеринг компонента
3. Фиксация в DOM

#### Часть 1: Триггер рендера

Рендер компонента происходит по двум причинам:

- Это его **начальный рендеринг**. это делается вызовом функции `createRoot`
- Его **состояние** (или состояние его родителя) **был обновлён**.  
  После того как компонент был первоначально отрендерен, вы можете инициировать последующие рендеры, обновляя его состояние с помощью функции set Обновление состояние компонента автоматически ставит его в очередь на рендер.

#### Часть 2: Как React рендерит ваш компонент

- На начальном рендере, React вызовет корневой компонент.
- Для последующих ре-рендеров React вызовет функцию компонента, где обновился стейт и выполнит его ре-рендер.  
  Этот процесс рекурсивен: если обновленный компонент возвращает какой-то другой компонент, React будет рендерить этот компонент следующим, и если этот компонент тоже что-то возвращает, он будет рендерить этот компонент следующим, и так далее. Этот процесс будет продолжаться до тех пор, пока не останется вложенных компонентов и React не будет точно знать, что должно быть отображено на экране.

- Во время первоначального рендеринга React создаст DOM-узлы
- Во время повторного рендеринга React вычислит, какие из их свойств, если таковые имеются, изменились с момента предыдущего рендеринга. Он ничего не будет делать с этой информацией до следующего шага, фазы фиксации.

#### Шаг 3: React фиксирует изменения в DOM

После рендеринга (вызова) ваших компонентов React изменит DOM:

- Для первоначального рендеринга, React будет использовать appendChild() DOM API для размещения всех созданных им узлов DOM на экране.
- Для повторного рендеринга, React будет применять минимально необходимые операции (вычисляемые во время рендеринга!), чтобы DOM соответствовал последнему выводу рендеринга.

React изменяет узлы DOM, только если есть разница между рендерами.

### Queueing a Series of State Updates

Batching - React ждет, пока не будет выполнен весь код в обработчиках событий, прежде чем обрабатывать ваши обновления состояния.

```jsx
export default function Counter() {
	const [number, setNumber] = useState(0);

	return (
		<>
			<h1>{number}</h1>
			<button
				onClick={() => {
					setNumber((n) => n + 1);
					setNumber((n) => n + 1);
					setNumber((n) => n + 1);
				}}
			>
				+3
			</button>
		</>
	);
}
```

функция updater - `n => n + 1`

### Updating Objects in State

```jsx
export default function Form() {
	const [person, setPerson] = useState({
		firstName: 'Barbara',
		lastName: 'Hepworth',
		email: 'bhepworth@sculpture.com',
	});

	function handleChange(e) {
		setPerson({
			...person,
			[e.target.name]: e.target.value,
		});
	}
	return (
		<form>
			<label>
				First name:
				<input
					name="firstName"
					value={person.firstName}
					onChange={handleChange}
				/>
			</label>
			<label>
				Last name:
				<input
					name="lastName"
					value={person.lastName}
					onChange={handleChange}
				/>
			</label>
			<label>
				Email:
				<input name="email" value={person.email} onChange={handleChange} />
			</label>
			<p>{`${person.firstName} ${person.lastName} (${person.email})`}</p>
		</form>
	);
}
```

> **Объекты на самом деле не являются вложенными**
>
> Объект, подобный этому, появляется "вложенным" в код:
>
> ```js
> let obj = {
> 	name: 'Niki de Saint Phalle',
> 	artwork: {
> 		title: 'Blue Nana',
> 		city: 'Hamburg',
> 		image: 'https://i.imgur.com/Sd1AgUOm.jpg',
> 	},
> };
> ```
>
> Однако "вложенность" - это неточный способ представления о том, как ведут себя объекты. Когда код выполняется, не существует такого понятия, как "вложенный" объект. На самом деле вы рассматриваете два разных объекта:
>
> ```js
> let obj1 = {
> 	title: 'Blue Nana',
> 	city: 'Hamburg',
> 	image: 'https://i.imgur.com/Sd1AgUOm.jpg',
> };
>
> let obj2 = {
> 	name: 'Niki de Saint Phalle',
> 	artwork: obj1,
> };
> ```
>
> Объект obj1 не находится "внутри" obj2. Например, obj3 может "указывать" и на obj1:
>
> ```js
> let obj1 = {
> 	title: 'Blue Nana',
> 	city: 'Hamburg',
> 	image: 'https://i.imgur.com/Sd1AgUOm.jpg',
> };
>
> let obj2 = {
> 	name: 'Niki de Saint Phalle',
> 	artwork: obj1,
> };
>
> let obj3 = {
> 	name: 'Copycat',
> 	artwork: obj1,
> };
> ```
>
> Если бы вы изменили `obj3.artwork.city`, это повлияло бы и на `obj2.artwork.city`, и на `obj1.city`. Это происходит потому, что `obj3.artwork`, `obj2.artwork` и `obj1` являются одним и тем же объектом. Это трудно заметить, когда вы думаете об объектах как о "вложенных". Вместо этого они представляют собой отдельные объекты, "указывающие" друг на друга с помощью свойств.

### Updating Arrays in State

|            | избегать (изменяет массив)        | предпочитать (возвращает новый массив)     |
| ---------- | --------------------------------- | ------------------------------------------ |
| добавление | push, unshift                     | concat, [...arr] синтаксис распространения |
| удаление   | pop, shift, splice                | filter, slice                              |
| замена     | splice, arr[i] = ... присваивание | map                                        |
| сортировка | reverse, sort                     | сначала копируем массив                    |

## Managing State

Порядок действий при разработке компонента

- **Identify** your component’s different visual states
- **Determine** what triggers those state changes
- **Represent** the state in memory using useState
- **Remove** any non-essential state variables
- **Connect** the event handlers to set the state

Принципы структурирования состояния:

- **Группируйте связанные состояния**. Если вы всегда обновляете две или более переменных состояния одновременно, подумайте о том, чтобы объединить их в одну переменную состояния.
- **Избегайте противоречий в состоянии**. Когда состояние структурировано таким образом, что несколько частей состояния могут противоречить и "не соглашаться" друг с другом, вы оставляете место для ошибок. Постарайтесь избежать этого.
- **Избегайте избыточного состояния.**Если вы можете вычислить какую-то информацию из пропсов компонента или его существующих переменных состояния во время рендеринга, не стоит помещать эту информацию в состояние компонента.
- Когда одни и те же данные дублируются в нескольких переменных состояния или во вложенных объектах, их трудно синхронизировать. Сократите дублирование, когда это возможно.
- **Избегайте глубоко вложенного состояния.** Глубоко иерархическое состояние не очень удобно для обновления. Когда это возможно, предпочитайте структурировать состояние плоским образом.

Объявляйте локальные переменные для читабельности кода

```jsx
const isSending = status === 'sending';
const isSent = status === 'sent';
```