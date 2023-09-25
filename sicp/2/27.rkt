#lang racket

(define (deep-reverse lst)
    (define (iter-reverse lst1 accumulator)
        (if (null? lst1)
            accumulator
            (if (pair? (car lst1))
                (iter-reverse (cdr lst1) (cons (deep-reverse (car lst1)) accumulator))
                (iter-reverse (cdr lst1) (cons (car lst1) accumulator)))))
    (iter-reverse lst '()))

(define x (list (list 1 2) (list 3 4)))

x

(reverse x)

(deep-reverse x)
