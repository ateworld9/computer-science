[Алгоритмы и Структуры данных](../../DataStructures_and_Algorithms.md)

# Сортировка Подсчетом

Использовать:

- подходит для массивов с маленьким диапазоном значений и множеством повторов

```jsx
function countingSort(arr) {
	const map = {};
	// пройтись по всему массиву, посчитать количество одинаковых эл-тов
	arr.forEach((el) => {
		if (map[el] >= 0) {
			map[el] = map[el] + 1;
		} else {
			map[el] = 0;
		}
	});
	// arr.forEach((el) => {map[el] = map[el] >= ? map[el] + 1 : 0})

	const res = [];
	// выписать элементы из словаря в новый массив
	for (const key in map) {
		let count = map[key];
		while (count > 0) {
			res.push(+key);
			count -= 1;
		}
	}
	return res;
}
```

**Временная сложность** - $O(n+k)$  
**Сложность по памяти** - $O(k)$  
$n$ — длинна массива  
$k$ — кол-во уникальных значений
