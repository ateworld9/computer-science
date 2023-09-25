#lang racket
(provide last-pair)
(define (list-ref items n)
	(if (= n 0)
			(car items)
			(list-ref (cdr items) (- n 1))))

; (define (length items)
; 	(if (null? items)
; 			0
; 			(+ 1 (length (cdr items)))))

(define (length items) 
	(define (length-iter a count)
		(if (null? a)
				count
				(length-iter (cdr a) (+ 1 count))))
		(length-iter items 0))

(define (my-append list1 list2) 
	(if (null? list1)
			list2
			(cons (car list1) (append (cdr list1) list2))))

(define (last-pair list)
	(list-ref list (- (length list) 1)))


(define squares (list 1 4 9 16 25))
(define odds (list 1 3 5 7))

(display (list-ref squares 3))
(newline)
(display (length squares ))
(newline)
(display (my-append squares odds))
(newline)
(display (last-pair squares))
(newline)
(display (last-pair odds))

