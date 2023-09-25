#lang racket

(define (fringe tree)
    (define (fringe-iter tree accumulator)
        (cond ((null? tree) '())
              ((not (pair? tree)) (list tree))
              (else 
                (append accumulator 
                                (fringe-iter (car tree) '())
                                (fringe-iter (cdr tree) '())))))
    (fringe-iter tree '()))

(define x (list (list 1 2) (list 3 4)))

(fringe x)
(newline)
(fringe (list x x))
