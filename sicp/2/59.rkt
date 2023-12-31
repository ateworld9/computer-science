#lang racket

(define (element-of-set? x set1)
  (cond ((null? set1) false)
        ((equal? x (car set1)) true)
        (else (element-of-set? x (cdr set1)))))

(define (adjoin-set x set)
  (if (element-of-set? x set)
      set
      (cons x set)))

(define (intersection-set set1 set2)
  (cond ((or (null? set1) (null? set2)) '())
        ((element-of-set? (car set1) set2)
         (cons (car set1)
               (intersection-set (cdr set1) set2)))
        (else (intersection-set (cdr set1) set2))))

(intersection-set '(1 2) '(3 4))
(intersection-set '(1 2 3) '(2 4))

(define (union-set set1 set2)
  (cond ((null? set1) set2)
        ((element-of-set? (car set1) set2) (union-set (cdr set1) set2))
        (else (cons (car set1) (union-set (cdr set1) set2)))))
(union-set '(1 2) '(3 4))
(union-set '(1 2 3) '(2 4))

