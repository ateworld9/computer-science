#lang racket
(provide make-point x-point y-point make-segment start-segment end-segment midpoint-segment print-point)

(define (make-point x y) (cons x y))
(define (x-point point)
  (car point))
(define (y-point point)
  (cdr point))
(define (make-segment x1 y1 x2 y2) 
  (cons (make-point x1 y1) (make-point x2 y2)))

(define (start-segment segment)
  (car segment))
(define (end-segment segment)
  (cdr segment))

(define (midpoint-segment segment) 
  (make-point (/ 
                (+ 
                  (x-point (start-segment segment))
                  (x-point (end-segment segment)))
                2) 
              (/
                (+
                  (y-point (start-segment segment))
                  (y-point (end-segment segment)))
                2)))


(define (print-point p)
  (newline)
  (display "(")
  (display (x-point p))
  (display ",")
  (display (y-point p))
  (display ")"))

; (print-point (midpoint-segment (make-segment 1 0 0 1)))
