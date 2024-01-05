# Алгоритмы и Структуры данных

#algorithms  
#data_structures

[Теоретический минимум](./TheoryMinimum.md)

> $log\:n$ = $log_2\,n$
> По строкам матрицы двигаться дешевле, чем по столбцам

$O(x)$ — асимптота времени решения  
$T(n)$ — время работы в худшем случае

**Классы задач**

**P** — решается за полиномиальное время, если $T(n)\in O(n^k),\;где\;k > 1$

**NP** — для задач этого класса неизвестны эффективные алгоритмы решения, поэтому рассматриваются алгоритмы проверки правильности решений

- [Алгоритм Евклида](./Euclid/Euclid.md)

### **Поиск**

- [Линейный поиск](./Search/linarysearch.md)
- [Бинарный поиск](./Search/binarysearch.md)
- Троичный поиск

### **Сортировка**

Устойчивая сортировка — сортировка , которая не меняет относительный порядок сортируемых элементов, имеющих одинаковые ключи, по которым происходит сортировка.

**Сложность**:

| Алгоритм  | Лучший случай | Средний     | Худший случай |
| --------- | ------------- | ----------- | ------------- |
| Пузырьком | $n$           | $n^2$       | $n^2$         |
| Выбором   | $n^2$         | $n^2$       | $n^2$         |
| Вставками | $n$           | $n^2$       | $n^2$         |
| Слиянием  | $n\;log_2n$   | $n\;log_2n$ | $n\;log_2n$   |
| Быстрая   | $n\;log_2n$   | $n\;log_2n$ | $n^2$         |

- [Подсчетом](./Sort/countingsort/countingsort.md)
- [Быстрая](./Sort/quicksort/quicksort.md)
- [Слиянием](./Sort/mergesort/mergesort.md)
- [Пузырьком](./Sort/bublesort/bublesort.md)
- [Поразрядная](./Sort/radixsort/radixsort.md) (todo)
- [Выбором](./Sort/selectionsort/selectionsort.md) (todo)
- [Вставками](./Sort/insertionsort/insertionsort.md) (todo)
- [Пирамидальная](./Sort/heapsort/heapsort.md) (todo)

### Структуры

**Амортизированная сложность** —

**Персистентные структуры данных** — это структуры данных, которые при внесении в них каких-то изменений сохраняют все свои предыдущие состояния и доступ к этим состояниям.

- [Множество уникальных элементов(set)](./Set/Set.md) (todo)
- [Словарь(map, dict)](./Map/Map.md) (todo)
- [Связный список](./LinkedList/LinkedList.md)
- Очередь [Link_proglib](https://proglib.io/p/rasprostranennye-algoritmy-i-struktury-dannyh-v-javascript-steki-ocheredi-i-svyaznye-spiski-2021-10-13)
- Стек [Link_proglib](https://proglib.io/p/rasprostranennye-algoritmy-i-struktury-dannyh-v-javascript-steki-ocheredi-i-svyaznye-spiski-2021-10-13)
- Дэк
- [Деревья](./Tree/Trees.md)
- [Бинарная куча](./BinaryHeap/BinaryHeap.md)
- [Графы](./Graph/Graphs.md)

### Методы решения алгоритмических задач:

- [Метод скользящего окна](./algos/windowingMethod/SlidingWindow.md)
- [Метод двух указателей](./algos/twoPointers/TwoPointers.md)
- [Поиск цикла](./algos/findLoop/FindLoop.md)
- [Слияние интервалов](./algos/mergeIntervals/MergeIntervals.md)
- [Префиксные суммы](./algos/prefixSums/PrefixSums.md)

- [Жадный алгоритм](./Greedy/Greedy.md)
- [Динамическое Программирование](./DynamicProgramming/DynamicProgramming.md)

Хэширование:

- [Сравнение Полиномов](./Hashing/PolynomsEquality.md)

- Алгоритм Манакера
- Z-функция
