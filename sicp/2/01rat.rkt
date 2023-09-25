#lang racket
(provide make-rat numer denom add-rat sub-rat div-rat equal-rat? print-rat)

(define (make-rat x y )
  (let* ((my-gcd (gcd x y ))
          (x (/ x my-gcd))
          (y (/ y my-gcd)).

          (sign (/ (abs y) y)))
    (cons (* x sign) (* y sign))))

(define (numer x) (car x))

(define (denom x) (cdr x))

(define (add-rat x y) 
	(make-rat (+ (* (numer x) (denom y))
							 (* (numer y) (denom x)))
						(* (denom x) (denom y))))

(define (sub-rat x y) 
	(make-rat (- (* (numer x) (denom y))
							 (* (numer y) (denom x)))
						(* (denom x) (denom y))))

(define (mul-rat x y)
	(make-rat (* (numer x) (numer y))
						(* (denom x) (denom y))))

(define (div-rat x y)
	(make-rat (* (numer x) (denom y))
						(* (denom x) (numer y))))

(define (equal-rat? x y)
	(= (* (numer x) (denom y))
		 (* (numer y) (denom x))))

(define (print-rat x) 
	(newline)
	(display (numer x))
	(display "/")
	(display (denom x)))

(define one-half (make-rat 1 2))

; (print-rat one-half)

(define one-third (make-rat 1 3))

; (print-rat one-third)

; (print-rat (add-rat one-half one-third))
; (print-rat (add-rat one-third one-third))
; (print-rat (mul-rat one-half one-third))


; (print-rat (make-rat -65 -5))
