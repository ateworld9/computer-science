[Алгоритмы и Структуры данных](../DataStructures_and_Algorithms.md)

# Линейный поиск

**Временная сложность** **—** O(N)

**Порядок действий:** простой перебор

**Классические задачи**: поиск максимума или минимум

```js
function findmax(arr) {
	let ans = arr[0] ?? -1;
	arr.forEach((el) => {
		if (el > ans) {
			ans = el;
		}
	});
	return ans;
}
```
