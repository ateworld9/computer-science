[Алгоритмы и Структуры данных](../../DataStructures_and_Algorithms.md)

# Пузырьком

- берет два элемента, сравнивает
  - если левый больше → свап
- Берет текущий больший и следующий за ним элемент

```jsx
function bubbleSort(arr) {
	for (let j = arr.length - 1; j > 0; j--) {
		for (let i = 0; i < j; i++) {
			if (comparator(arr[i], arr[i + 1]) > 0) {
				swap(arr, i, i + 1);
			}
		}
	}
}
```
