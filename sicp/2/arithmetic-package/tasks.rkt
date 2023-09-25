#lang racket

(require "./integer.rkt")
(require "./real.rkt")
(require "./rational.rkt")
(require "./complex.rkt")
(require "./polynomial.rkt")

(require "./op.rkt")

(install-integer-package)
(install-real-package)
(install-rational-package)
(install-complex-package)
(install-polynomial-package)


"type tower"
(supertype? 'integer 'rational)
(supertype? 'integer 'real)
(supertype? 'integer 'complex)
(supertype? 'rational 'real)
(supertype? 'rational 'complex)
(supertype? 'real 'complex)

"integers"
(add (make-integer 1) (make-integer 2)) (make-integer 3)
(sub (make-integer 3) (make-integer 2)) (make-integer 1)
(mul (make-integer 2) (make-integer 4)) (make-integer 8)
(equ? (make-integer 1) (make-integer 1))
(equ? (make-integer 1) (make-integer 2))
(raise (make-integer 2)) (make-rational 2 1)
(=zero? (make-integer 0))

"rationals"
(add (make-rational 1 2) (make-rational 3 4)) (make-rational 5 4)
(sub (make-rational 3 4) (make-rational 1 2)) (make-rational 1 4)
(mul (make-rational 2 3) (make-rational 3 6)) (make-rational 1 3)
(div (make-rational 5 4) (make-rational 1 2)) (make-rational 5 2)
(raise (make-rational 5 2)) (make-real 2.5)
(equ? (make-rational 1 2) (make-rational 2 4))
(equ? (make-rational 1 2) (make-rational 1 3))
(project (make-rational 5 2)) (make-integer 2)
(=zero? (make-rational 0 1))

"reals"
(add (make-real 1.5) (make-real 2.0)) (make-real 3.5)
(sub (make-real 3.5) (make-real 2.0)) (make-real 1.5)
(mul (make-real 1.25) (make-real 2.0)) (make-real 2.5)
(div (make-real 5.0) (make-real 2.0)) (make-real 2.5)
(sine (make-real 1.0)) (make-real (sin 1.0))
(cosine (make-real 1.0)) (make-real (cos 1.0))
(square-root (make-real 2.0)) (make-real (sqrt 2.0))
(arctangent (make-real 3.0) (make-real 4.0)) (make-real (atan 3.0 4.0))
(equ? (make-real 2.5) (make-real 2.5))
(equ? (make-real 2.0) (make-real 2.5))
(project (make-real 2.5)) (make-rational 2 1)
(=zero? (make-real 0.0))

"coercions among numbers"
(div (make-integer 1) (make-integer 2)) (make-rational 1 2)
(add (make-integer 1) (make-rational 1 2)) (make-rational 3 2)
(add (make-integer 1) (make-real 2.5)) (make-real 3.5)
(sine (make-integer 1)) (make-real (sin 1.0))
(sine (make-rational 2 2)) (make-real (sin 1.0))
(arctangent (make-integer 3) (make-integer 4)) (make-real (atan 3.0 4.0))

"simplification"
(simplify (make-rational 2 1)) (make-integer 2)
(simplify (make-real 4.0)) (make-integer 4)
(simplify (make-real 2.5)) (make-real 2.5)

(define (t order n)
  (list order (make-integer n)))

(define (sparse . terms)
  (cons 'sparse terms))

(define (dense . coeffs)
  (cons 'dense (map make-integer coeffs)))

(define (poly var term-list)
  (make-polynomial var term-list))

"sparse representation"
(empty-termlist? (the-empty-sparse-termlist)) #true
(first-term (sparse (t 2 1))) (t 2 1)
(rest-terms (sparse (t 2 1) (t 1 2)))
(sparse (t 1 2))
(adjoin-term (t 2 2) (sparse (t 1 1)))
(sparse (t 2 2) (t 1 1))
(adjoin-term (t 2 0) (sparse (t 1 1)))
(sparse (t 1 1))
(adjoin-term (t 1 -1) (sparse (t 2 1) (t 1 1) (t 0 1)))
(sparse (t 2 1) (t 0 1))

"dense representation"
(empty-termlist? (the-empty-dense-termlist)) #true
(first-term (dense 10 20 30)) (t 2 10)
(rest-terms (dense 10 20 30)) (dense 20 30)
(adjoin-term (t 2 1) (dense 1))
(dense 1 0 1)
(adjoin-term (t 0 1) (dense 1 1))
(dense 1 2)
(adjoin-term (t 0 1) (dense 1 0 0))
(dense 1 0 1)
(adjoin-term (t 2 0) (dense 1))
(dense 1)

"polynomials"
(add (poly 'x (sparse (t 2 1)))
     (poly 'x (sparse (t 1 0))))
(poly 'x (sparse (t 2 1) (t 1 0)))
(mul (poly 'x (sparse (t 1 1) (t 0 1)))
     (poly 'x (sparse (t 1 1) (t 0 -1))))
(poly 'x (sparse (t 2 1) (t 0 -1)))
(sub (poly 'x (sparse (t 2 3) (t 1 3) (t 0 3)))
     (poly 'x (sparse (t 2 3) (t 1 2) (t 0 1))))
(poly 'x (sparse (t 1 1) (t 0 2)))

(add (poly 'x (dense 2 0))
     (poly 'x (dense 1)))
(poly 'x (dense 2 1))
(mul (poly 'x (dense 1 1))
     (poly 'x (dense 1 -1)))
(poly 'x (dense 1 0 -1))

; (add (poly 'x 1 2 3) (poly 'x 4 5 6))
; (poly 'x 5 7 9)
; (mul (poly 'x 1 1) (poly 'x 1 -1))
; (poly 'x 1 0 -1)
; (mul (poly 'x 1 (poly 'y 1 0))
;      (poly 'x 1 (poly 'y 1 0)))
; (poly 'x 1 (poly 'y 2 0) (poly 'y 1 0 0))
; (neg (poly 'x 1 -2 3))
; (poly 'x -1 2 -3)
; (sub (poly 'x 4 4 4)
;      (poly 'x 3 2 1))
; (poly 'x 1 2 3)
; (sub (poly 'x 3 3 3)
;      (poly 'x 3 2 1))
; (poly 'x 1 2)
