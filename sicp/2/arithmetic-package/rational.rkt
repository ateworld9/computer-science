#lang racket
(require "./tag.rkt")
(require "./op.rkt")

; Rational number package:
(define (install-rational-package)
  ; внутренние процедуры
  (define (numer x) (car x))
  (define (denom x) (cdr x))
  (define (make-rat n d)
    (let ((g (gcd n d)))
      (cons (/ n g) (/ d g))))
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
  (define (neg-rat x)
    (make-rat (- (numer x)) (denom x)))
  (define (=zero?-rat x)
    (zero? (numer x)))
  (define (raise-rat r)
    (make-real (exact->inexact (/ (numer r) (denom r)))))
  (define (project-rat r)
    (make-integer (truncate (/ (numer r) (denom r)))))
  (define (tag x)
    (attach-tag 'rational x))

  (put 'numer '(rational) numer)
  (put 'denom '(rational) denom)
  (put 'raise '(rational) raise-rat)
  (put 'project '(rational) project-rat)
  (put '=zero? '(rational) =zero?-rat)
  (put 'add '(rational rational) (lambda (x y) (tag (add-rat x y))))
  (put 'sub '(rational rational) (lambda (x y) (tag (sub-rat x y))))
  (put 'mul '(rational rational) (lambda (x y) (tag (mul-rat x y))))
  (put 'div '(rational rational) (lambda (x y) (tag (div-rat x y))))
  (put 'neg '(rational) (lambda (x) (tag (neg-rat x))))
  (put 'equ? '(rational rational) equal?)

  (put 'make 'rational (lambda (n d) (tag (make-rat n d))))
  'done)

(provide install-rational-package)
