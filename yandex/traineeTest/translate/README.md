# dynamic-translations tester

В файле `src\example.js` доступен пример скрипта для теста.
Решение можно писать в файле `src\solution.js`.

Для проверки решения запустите `npm start`, после этого в файле `output.json` будет доступен результат выполнения.

# Трудности перевода

Морти получил письмо от Рика с набором непонятных символов. Немного покопавшись в коде, становится понятно, что библиотека переводов используется в статистических объектах:

```javascript
const {
	translate, // (key: string) => string;
	changeLanguage, // (lang: string) => void;
} = require('translate');

const options = {
	key1: translate('key1'),
	key2: translate('key2'),
	key3: translate('key3'),
};

console.log(options.key1); // Выводит 'ru:key1',

changeLanguage('en');

console.log(options.key1); // Все еще выводит 'ru:key1', а должно 'en:key1'
```

Видно, что переключение языка в данном случае не меняет перевод как требуется.

Поэтому, чтобы прочитать послание, нужно сделать эти объекты динамическими с помощью функции makeDynamicTranslations. А чтобы она могла взаимодействовать с ключами, все вызовы функции translate нужно заменить на вызов функции dynamicTranslate:

```javascript
const {
	changeLanguage,
	dynamicTranslate,
	makeDynamicTranslations,
} = require('dynamic-translate');

const options = makeDynamicTranslations({
	key1: dynamicTranslate('key1'),
	key2: dynamicTranslate('key2'),
	key3: dynamicTranslate('key3'),
});

console.log(options.key1); // Выводит 'ru:key1',

changeLanguage('en');

console.log(options.key1); // Выводит 'en:key1'
```

В качестве решения нужно как раз реализовать функции makeDynamicTranslations и dynamicTranslate. Для этого требуется прислать решение в следующем виде:

```javascript
module.exports = function (translate /* (key: string) => string */) {
	// Ваше решение
	const makeDynamicTranslations = (e) => e;
	const dynamicTranslate = translate;

	return {
		makeDynamicTranslations,
		dynamicTranslate,
	};
};
```

Сложный пример использования:

```javascript
const object = makeDynamicTranslations({
	key: dynamicTranslate('key'),
	key2: dynamicTranslate('key2'),
	key3: 10,
	key4: {
		innerKey: 'innerKey',
		innerObj: {
			test: 123,
			key: null,
			someOtherKey: [],
		},
	},
	array: [
		dynamicTranslate('array1'),
		dynamicTranslate('array2'),
		dynamicTranslate('array3'),
		{
			key: dynamicTranslate('array4'),
		},
	],
});

const object2 = makeDynamicTranslations({
	options: object,
	key: dynamicTranslate('object2key'),
});
```
