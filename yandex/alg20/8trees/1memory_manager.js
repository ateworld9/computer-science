/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
// Менеджмент памяти
// - У нас есть заранее неизвестное количество структур с двумя ссылками на другие структуры
// - знаем максимальное количество таких структур существующих одновременно
// - хотим научиться выделять и освобождать память

function initMemory(maxElements) {
	const memory = new Array(maxElements);
	memory.forEach((element, i) => {
		memory[i] = { key: 0, left: i + 1, right: 0 };
		return { memory, firstfree: 0 };
	});
}

function newNode(memStruct) {
	const { memory, firstfree } = memStruct;
	memStruct.firstfree = memory[firstfree][1];
	return firstfree;
}

function delNode(memStruct, index) {
	const [memory, firstfree] = memStruct;
	memory[index].left = firstfree;
	memStruct.firstfree = index;
}
