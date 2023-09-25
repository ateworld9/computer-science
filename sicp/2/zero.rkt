#lang racket
(require "./tag.rkt")

(define (make-rational n d)
  ((get 'make 'rational) n d))

(define (install-=zero?-package)
  (put '=zero? '(scheme-number)
       (lambda (x) (= x 0)))
  (put '=zero? '(rational)
       (lambda (x) (equal? x (contents (make-rational 0 1)))))
  (put '=zero? '(complex)
       (lambda (z) (and (= (real-part z) 0)
                        (= (imag-part z) 0))))
  (put '=zero? 'polynomial)
  'install-=zero?-package_done)
(install-=zero?-package)

(define (=zero? x)
  (apply-generic '=zero? x))

(provide =zero?)
