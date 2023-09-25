#lang racket

(define identity (lambda (x) x))

(define zero (lambda (f) identity))

(define (add−1 n)
	(lambda (f) (lambda (x) (f (n f) x))))

(define one (lambda (f) (lambda (x) (f x))))

(define two (lambda (f) (lambda (x) (f (f x)))))

(define (plus a b)
	(lambda (f) (lambda (x) (a f) (b f) x)))


(display zero)
(display one)
