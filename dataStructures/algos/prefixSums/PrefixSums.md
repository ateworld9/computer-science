[Алгоритмы и Структуры данных](../../DataStructures_and_Algorithms.md)

Метод префиксных сумм

Применять если:

- Последовательность длинной n, и m запросов к ней

1. Функция, вычисляющая массив _сумм(в зависимости от задачи)_
2. Функция выполняющая запрос к массиву

```jsx
// array      - 5 3 8 1  4  6
// prefixsums - 0 5 8 16 17 21 27
function makePrefixSums(nums) {
	const prefixSum = new Array(nums.length + 1); // +1 тк первая сумма - 0
	prefixSum[0] = 0; // инициализируем первую сумму
	for (let i = 1; i < prefixSum.length; i += 1) {
		prefixSum[i] = prefixSum[i - 1] + nums[i - 1];
	}
	return prefixSum;
}
//вычисляет на полуинтервале [l, r)
function rangeSumQuery(prefixSum, l, r) {
	return prefixSum[r] - prefixSum[l];
}
```
