let currentLanguage = 'ru';

const changeLanguage = (language) => {
	currentLanguage = language;
};

const translate = (key) => {
	return `${currentLanguage}:${key}`;
};

const options = {
	key1: translate('key1'),
	key2: translate('key2'),
	key3: translate('key3'),
};

console.log(options.key1);

changeLanguage('en');

console.log(options.key1);

function makeDynamicTranslations(translate) {}

const options1 = makeDynamicTranslations({
	key1: dynamicTranslate('key1'),
	key2: dynamicTranslate('key2'),
	key3: dynamicTranslate('key3'),
});

console.log(options1.key1); // Выводит 'ru:key1',

changeLanguage('en');

console.log(options1.key1); // Выводит 'en:key1'
