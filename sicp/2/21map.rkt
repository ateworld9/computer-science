#lang racket
(require "../1/square.rkt")

(define (map proc items)
    (if (null? items)
        null
        (cons (proc (car items)) 
              (map proc (cdr items)))))

(define (scale-list items factor)
    (map (lambda (x) (* x factor)) items))

(display (scale-list (list 1 2 3 4 5) 10))

(define (square-list items)
    (map square items))

(newline)
(display (square-list (list 1 2 3 4 5)))


(newline)
(define x (cons (list 1 2) (list 3 4)))

(length x)

(count-leaves x)
