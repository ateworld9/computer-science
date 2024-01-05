[Алгоритмы и Структуры данных](../../DataStructures_and_Algorithms.md)

# Нахождение цикла

1. Объявляем 2 указателя
2. медленный указатель двигается в следующую ячейку
3. быстрый указатель двигается через одну ячейку
4. если один из указателей null или undefined — выход , не зациклен
5. если указатели равны — выход, зациклен

```jsx
hasLoop(head) {
    let slow = head
    let fast = head
    **while (true)** {
      slow = slow.next

      if (fast.next !== null) {
        fast = fast.next.next
      } else {
        return false
      }

      if (slow === null || fast === null
				  || slow === undefined || fast === undefined) {
        return false
      }

      if (slow === fast) {
        return true
      }
    }
  }
```
