#lang racket
(provide accumulate accumulate-n)

(define (accumulate op initial sequence) 
    (if (null? sequence)
        initial
        (op (car sequence)
            (accumulate op initial (cdr sequence)))))

(define (accumulate-n op init seqs) 
    (if (null? (car seqs))
        null
        (cons (accumulate op init (map car seqs))
              (accumulate-n op init (map cdr seqs)))))

; (accumulate (lambda (x y) (+ x y)) 0 (list 1 2 3 4 5 ))
