#lang racket
(provide gcd)

; Алгоритм Евклида (нахождение НОД)
(define (gcd a b)
        (if (= b 0)
            a 
            (gcd b (remainder a b))))
