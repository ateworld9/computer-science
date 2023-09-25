#lang racket
(provide fold-right fold-left)

(define (fold-right op initial sequence) 
    (if (null? sequence)
        initial
        (op (car sequence)
            (fold-right op initial (cdr sequence)))))

(define (fold-left op initial sequence) 
    (define (iter result rest)
        (if (null? rest)
            result
            (iter (op result (car rest))
                  (cdr rest))))
    (iter initial sequence))

; (fold-right / 1 (list 1 2 3))
; (newline)
; (fold-left / 1 (list 1 2 3))
; (newline)
; (fold-right list null (list 1 2 3))
; (newline)
; (fold-left list null (list 1 2 3))
