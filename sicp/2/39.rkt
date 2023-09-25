#lang racket
(require "./38.rkt")
(define (reverse-r sequence)
  (fold-right (lambda (x y) (append y (list x)))
              null
              sequence))

(define (reverse-l sequence)
  (fold-left (lambda (x y) (cons y x))
             null
             sequence))

(reverse-r '(1 2 3 4 5))
(reverse-l '(1 2 3 4 5))
