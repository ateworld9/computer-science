#lang racket

(define (equal? a b)
  (cond ((and (null? a) (null? b)) true)
        ((and (pair? a) (pair? b))
         (and (equal? (car a) (car b))
              (equal? (cdr a) (cdr b))))
        (else (eq? a b))))

(equal? '(this is a list) '(this is a list))
(newline)
(equal? '(this is a list) '(this (is a) list))
