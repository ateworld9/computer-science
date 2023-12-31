# C. Привычный порядок вещей

Иван работает менеджером на проекте, где на некоторых страницах, фронтенд отрисовывается из конфигов, которые приходят по запросу от стороннего сервиса. Например, фильтры поиска или элементы главного меню. Недавно Иван заметил, что элементы в данных содержащие массивы из стороннего сервиса начали приходить в разном порядке. В интерфейсе это сразу же отобразилось и начало вызывать недовольство пользователей, ведь никто не любит, когда меняется привычный порядок вещей. Техподдержка сервиса не отвечала и Иван принял решение исправить данную проблему на клиентской стороне. Он написал для каждого вида перечислений шаблонный порядок, который точно не должен меняться. Теперь ему требуется помощь, чтобы внедрить это. Напишите функцию, которая сортирует исходные данные по переданному шаблону.

Формат решения:

На вход подается массив данных одинакового типа и шаблон в котором указан порядок в виде массива. Третьим параметром передается поле объекта по которому нужно сортировать или ничего если это массив примитивов.

```
/**
 * @params (
 *  array: (string | number | object)[],
 *  order: (string | number)[],
 *  field?: string
 * )
 * @returns (string | number | object)[]
 */
module.exports = function(array, order, field) {
   // ваш код
}
```

Так как в конфигах с сервиса могут приходить как старые поля, которые есть в шаблоне, так и новые, нужно поддержать следующую функциональность:

- На выходе хотим получить отсортированный массив исходных данных.
- Первыми идут элементы, у которых сортируемые значения находится в шаблоне раньше других.
- Далее идут значения которых не было в шаблоне. Они должны быть отсортированные в зависимости от типа (для string лексикографически, для number по возрастанию) и дописаны в конец массива с результатом предыдущего пункта.
- В случае когда на вход подается массив объектов, сортировать нужно по полю, которое найдется первым в данном объекте при поиске в ширину (bfs). Гарантируется, что такое поле всегда есть.
