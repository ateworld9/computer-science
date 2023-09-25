#lang racket
(require "../1/square.rkt")
(require "02segment.rkt")
(provide make-rectangle get-height get-width)

(define (make-rectangle x1 y1 x2 y2 x3 y3 x4 y4)
	(cons (make-point x1 y1) 
				(cons (make-point x2 y2) 
							(cons (make-point x3 y3)
										(cons (make-point x4 y4) "()")))))

(define (nth-point n rectangle) 
	(if (= n 1)
		   (car rectangle)
			 (nth-point (- n 1) (cdr rectangle))))

(define (dist point1 point2) (
	sqrt (+
	 				(square (- (x-point point1) (x-point point2))) 
	 				(square (- (y-point point1) (y-point point2))))))

(define (get-height rectangle) 
	(dist (nth-point 1 rectangle) (nth-point 2 rectangle)))
(define (get-width rectangle)
	(dist (nth-point 2 rectangle) (nth-point 3 rectangle)))

