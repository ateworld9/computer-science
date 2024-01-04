function getValueByField(obj, field) {
	const keys = Object.keys(obj);
	const queue = [...keys];

	while (queue.length > 0) {
		const currentKey = queue.shift();
		if (currentKey.endsWith(field)) {
			const pathArray = currentKey.split('.');
			let result = obj;
			for (const part of pathArray) {
				result = result[part];
			}
			return result;
		}

		if (typeof obj[currentKey] === 'object') {
			queue.push(
				...Object.keys(obj[currentKey]).map((el) => currentKey + '.' + el),
			);
		}
	}

	// Не должно произойти, так как гарантируется, что поле всегда есть
	return null;
}

module.exports = function sortByTemplate(array, order, field) {
	const orderMap = new Map(order.map((value, index) => [value, index]));

	function compare(a, b) {
		const aValue = field ? getValueByField(a, field) : a;
		const bValue = field ? getValueByField(b, field) : b;

		const orderA = orderMap.get(aValue);
		const orderB = orderMap.get(bValue);

		if (orderA !== undefined && orderB !== undefined) {
			return orderA - orderB;
		} else if (orderA !== undefined) {
			return -1;
		} else if (orderB !== undefined) {
			return 1;
		} else {
			// Если значения не найдены в шаблоне, сортируем их в зависимости от типа
			if (typeof aValue === 'string' && typeof bValue === 'string') {
				return aValue.localeCompare(bValue);
			} else {
				return aValue - bValue;
			}
		}
	}

	return array.slice().sort(compare);
};
