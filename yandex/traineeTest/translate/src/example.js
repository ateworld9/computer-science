module.exports = function (
	{ makeDynamicTranslations, dynamicTranslate },
	changeLanguage,
) {
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

	const objectRu = JSON.stringify(object);
	const object2Ru = JSON.stringify(object2);

	changeLanguage('en');

	const objectEn = JSON.stringify(object);
	const object2En = JSON.stringify(object2);

	return {
		objectRu: JSON.parse(objectRu),
		object2Ru: JSON.parse(object2Ru),
		objectEn: JSON.parse(objectEn),
		object2En: JSON.parse(object2En),
	};
};
