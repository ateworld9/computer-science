#lang racket
(require "./tag.rkt")
(require "./op.rkt")

(define (install-integer-package)
  (define (tag x) (attach-tag 'integer x))
  (put 'add '(integer integer) (lambda (x y) (tag (+ x y))))
  (put 'sub '(integer integer) (lambda (x y) (tag (- x y))))
  (put 'mul '(integer integer) (lambda (x y) (tag (* x y))))
  (put 'neg '(integer) (lambda (x) (tag (- x))))
  (put 'equ? '(integer integer) =)
  (put '=zero? '(integer) zero?)
  (put 'raise '(integer) (lambda (n) (make-rational n 1)))
  (put 'make 'integer
       (lambda (n) (if (exact-integer? n)
                       (tag n)
                       (error "Attempted to make an integer with a non-integer" n)))))

(provide install-integer-package)
