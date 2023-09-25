#lang racket
; (define (my-cons x y) 
; 	(define (my-dispatch m) 
; 		(cond ((= m 0) x)
; 					((= m 1) y)
; 					(else (error "Аргумент не 0 или 1 --CONS" m))))
; 					my-dispatch)
; (define (my-car z) (z 0))
; (define (my-cdr z) (z 1))

(define (my-cons x y) (lambda (m) (m x y)))

(define (my-car z) (z (lambda (p q) p)))
(define (my-cdr z) (z (lambda (p q) q)))

(display (my-car (my-cons "a" "b")))
(newline)
(display (my-cdr (my-cons "a" "b")))
(newline)
