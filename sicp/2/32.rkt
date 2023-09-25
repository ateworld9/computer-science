#lang racket

(define (subsets s)
    (if (null? s)
        (list null)
        (let ((rest (subsets (cdr s))))
          (append rest (map (lambda (subset) (cons (car s) subset)) rest)))))

(subsets '(1 2 3))
