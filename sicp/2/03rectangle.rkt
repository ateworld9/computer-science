#lang racket
(require "03rectangle2.rkt")

(define (rectangle-area rectangle) 
	(* (get-height rectangle) (get-width rectangle)))

(define (rectangle-perimeter rectangle) 
	(* 2 (+ (get-height rectangle) (get-width rectangle))))

; (define rectangle (make-rectangle 0 0 0 2 2 2 2 0))
(define rectangle (make-rectangle 2 2))

(newline)
(display (rectangle-area rectangle))
(newline)
(display (rectangle-perimeter rectangle))
