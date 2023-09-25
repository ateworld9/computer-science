#lang racket

(define (same-parity . list) 
	(define (iter-parity list bit accumulator) 
		(cond ((null? list) accumulator)
			  ((= (remainder (car list) 2) bit) (iter-parity (cdr list) bit (cons (car list) accumulator)))
			  (else (iter-parity (cdr list) bit accumulator))))
	(reverse (iter-parity list (remainder (car list) 2 ) '())))

(display (same-parity 1 2 3 4 5 6 7 8 9))
(newline)
(display (same-parity 2 3 4 5 6 7 8 9 10))
