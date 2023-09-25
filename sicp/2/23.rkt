#lang racket

(define (for-each proc items) 
    (unless (null? items)
    (proc (car items))
    (for-each proc (cdr items))))

(for-each (lambda (x)
            (newline)
            (display x))
          (list 57 321 88))

(newline)
(list 1 (list 2 (list 3 4)))


