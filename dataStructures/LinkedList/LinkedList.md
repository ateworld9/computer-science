[Алгоритмы и Структуры данных](../DataStructures_and_Algorithms.md)

- In-Place Reverse

  - Объявить 3 переменных - `prev`, `curr`, `next`
  - Повторять пока - `curr ≠ null`
    - Сохранить следующий узел, во временную переменную next
    - **меняем** следующий(**`curr.next`**) узел, чтобы он ссылался на предыдущий узел.
      (безопасно тк мы сохранили ссылку на следующий в предыдущем шаге)
    - обновляем временные переменные
      - Текущий узел становится предыдущим `prev = curr`
      - Следующий узел становится текущим `curr = next`

  ```jsx
  function reverse(head) {
  	let next = null;
  	let prev = null;
  	let curr = head;

  	while (curr) {
  		next = curr.next; // Сохраняем следующий узел.

  		curr.next = prev; // Меняем следующий на предыдущий

  		prev = curr; // Текущий узел становится предыдущим.

  		curr = next; // Следующий узел становится текущим.
  	}

  	// В данном случае prev это последний узел,
  	// поэтому, после reverse, он становится первым.
  	head = prev;
  }
  ```

- Нахождение цикла
  самое главное обработать
  slow == null || fast ==null || fast.next == null → false

  ```jsx
  hasLoop(head) {
      let slow = head
      let fast = head
      while (true) {
        slow = slow.next

        if (fast.next !== null) {
          fast = fast.next.next
        } else {
          return false
        }

        if (slow === null || fast === null) {
          return false
        }

        if (slow === fast) {
          return true
        }
      }
    }
  ```
