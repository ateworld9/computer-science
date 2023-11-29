#lang racket
(provide gcd lcm)

; Алгоритм Евклида (нахождение НОД)

(define (gcd a b)
  (if (= b 0)
      a
      (gcd b (remainder a b)))); remainder(%) - Вычисляет остаток от деления y на x прим: 5 % 4 = 1

(define (lcm a b) ; least common multiplier наименьшее общее кратное
  ((/
    (* a b)
    (gcd a b))))
