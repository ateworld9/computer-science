#lang racket
(provide make-interval lower-bound upper-bound add-interval sub-interval mul-interval div-interval width-interval)

(define (make-interval a b) (cons a b))

(define (lower-bound interval) (min (car interval) (cdr interval)))
(define (upper-bound interval) (max (car interval) (cdr interval)))

(define (add-interval a b) 
	(make-interval 
							(+ (lower-bound a) (lower-bound b)) 
							(+ (upper-bound a) (upper-bound b))))

(define (sub-interval a b) 
	(make-interval 
								(- (upper-bound a) (lower-bound b)) 
								(- (lower-bound a) (upper-bound b))))

(define (mul-interval a b) 
	(let ((p1 (* (lower-bound a) (lower-bound b)))
				(p2 (* (lower-bound a) (upper-bound b)))
				(p3 (* (upper-bound a) (lower-bound b)))
				(p4 (* (upper-bound a) (upper-bound b))))
		(make-interval (min p1 p2 p3 p4)
									 (max p1 p2 p3 p4))))

(define (div-interval x y) 
	(when (and (< (lower-bound y) 0) (> (upper-bound y) 0))
		(error "Division by zero." (list x y)))
	(mul-interval x 
								(make-interval (/ 1.0 (upper-bound y))
															 (/ 1.0 (lower-bound y)))))

(define (width-interval interval) 
	(abs (- (upper-bound interval) (lower-bound interval))))

; (display (lower-bound (make-interval 4 5)))
; (newline)
; (display (upper-bound (make-interval 4 5)))
; (newline)
; (display (sub-interval (make-interval 100 -100) (make-interval -1 101)))
; (display (div-interval (make-interval 1 2) (make-interval -1 1)))
