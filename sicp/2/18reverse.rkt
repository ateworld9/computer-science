#lang racket

(define (reverse list) 
	(define (list-iter x y) 
		(if (null? y)
				x
				(list-iter (cons (car y) x) (cdr y))))
	(list-iter '() list))


(define squares (list 1 4 9 16 25))
(define odds (list 1 3 5 7))

(display (reverse squares))
(newline)

