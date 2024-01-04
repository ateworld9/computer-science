function unshift(arr, el) {
	const initialLength = arr.length;
	for (let i = initialLength; i > 0; i -= 1) arr[i] = arr[i - 1];

	arr[0] = el;
	return arr.length;
}

const arr = [1, 2];

console.log(arr, arr.unshift(0)); // результат вызова равен 3, новой длине массива
// arr равен [0, 1, 2]
