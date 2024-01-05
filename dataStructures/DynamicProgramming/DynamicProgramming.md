[Алгоритмы и Структуры данных](../DataStructures_and_Algorithms.md)

**Динамическое Программирование** — заключается в сохранении уже вычисленных значений в таблицу

Решает задачи:

- максимизировать или минимизировать (например прибыль)
- посчитать количество вариантов

Алгоритм применения:

1. создать таблицу вычисленных значений
2. проверить есть ли искомое значение в таблице
3. если нет, вычислить его(через рекурсию), сохранить в таблице
4. вернуть искомое значение из таблицы

- Общие принципы Динамического программирования
  - Понять что мы вычисляем
  - Найти как выразить задачу через рекурсию
  - Задать начальные значения (база динамики)
  - Знать в каком порядке вычислять значения
  - Понимать где искать ответ