#lang racket


(define (my-cons x y) (* (expt 2 x) (expt 3 y)))

(define (my-car z) (log(gcd (expt 2.0 (floor (log z 2))) z) 2))
(define (my-cdr z) (log(gcd (expt 3.0 (floor (log z 2))) z) 3))



(display (my-car (my-cons 14 4)))
(newline)
(display (my-cdr (my-cons 14 4)))
(newline)
