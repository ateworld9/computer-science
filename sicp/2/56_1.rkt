#lang racket


(define (variable? x)
  (symbol? x))

(define (same-variable? a b)
  (and (variable? a) (variable? b) (eq? a b)))

(define (make-sum a b) (list '+ a b))

(define (make-product a b) (list '* a b))

(define (sum? x)
  (and (pair? x) (eq? (car x) '+)))

(define (addend s) (cadr s))

(define (augend s) (caddr s))

(define (product? x)  (and (pair? x) (eq? (car x) '*)))

(define (multiplier s) (cadr s))

(define (multiplicand s) (caddr s))

(define (deriv exp var)
  (cond ((number? exp) 0)
        ((variable? exp)
         (if (same-variable? exp var)
             1
             0))
        ((sum? exp)
         (make-sum (deriv (addend exp) var)
                   (deriv (augend exp) var)))
        ((product? exp)
         (make-sum
          (make-product (deriv (multiplier exp) var)
                        (deriv (multiplicand exp) var))
          (make-product (deriv (multiplicand exp) var)
                        (deriv (multiplier exp) var))))
        (else (error "Неизвестный тип выражения -- DERIV" exp))))

(deriv '(+ x 3) 'x)
