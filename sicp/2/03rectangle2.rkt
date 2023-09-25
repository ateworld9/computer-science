#lang racket
(require "../1/square.rkt")
(require "02segment.rkt")
(provide make-rectangle get-height get-width)

; (define (my-list x) ())

(define (make-rectangle width height)
	(cons width height))

(define (get-width rectangle)
	(car rectangle))
(define (get-height rectangle) 
	(cdr rectangle))
