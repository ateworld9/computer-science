#lang racket
(require "./tag.rkt")
(require "./op.rkt")

; Real numbers:
(define (install-real-package)
  (define (tag x) (attach-tag 'real x))
  (put 'add '(real real) (lambda (x y) (tag (+ x y))))
  (put 'sub '(real real) (lambda (x y) (tag (- x y))))
  (put 'mul '(real real) (lambda (x y) (tag (* x y))))
  (put 'div '(real real) (lambda (x y) (tag (/ x y))))
  (put 'neg '(real) (lambda (x) (tag (- x))))
  (put 'sine '(real) (lambda (x) (tag (sin x))))
  (put 'cosine '(real) (lambda (x) (tag (cos x))))
  (put 'square-root '(real) (lambda (x) (tag (sqrt x))))
  (put 'arctangent '(real real) (lambda (x y) (tag (atan x y))))
  (put 'project '(real) (lambda (x) (make-rational (inexact->exact (truncate x)) 1)))
  (put 'raise '(real) (lambda (x) (make-complex-from-real-imag (tag x) (tag 0.0))))
  (put 'equ? '(real real) =)
  (put '=zero? '(real) zero?)
  (put 'make 'real (lambda (x) (tag x))))

(provide install-real-package)
