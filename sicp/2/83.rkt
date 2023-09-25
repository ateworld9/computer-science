#lang racket

(define table (make-hash))

(define (put op type item)
  (hash-set! table (list op type) item))

(define (get op type)
  (hash-ref table (list op type) #f))

; Then, the type operations:

(define (attach-tag type-tag contents)
  (cons type-tag contents))

(define (type-tag datum)
  (if (pair? datum)
      (car datum)
      (error "Bad tagged datum - TYPE-TAG" datum)))

(define (contents datum)
  (if (pair? datum)
      (cdr datum)
      (error "Bad tagged datum - CONTENTS" datum)))

(define (apply-generic op . args)
  (let ((type-tags (map type-tag args)))
    (let ((proc (get op type-tags)))
      (if proc
          (apply proc (map contents args))
          (error "No method for these types - APPLY-GENERIC" (list op type-tags))))))

; Now our types

(define (make-integer n) (attach-tag 'integer n))
(define (make-rational r d) (attach-tag 'rational (cons r d)))
(define (make-real x) (attach-tag 'real x))
(define (make-complex r i) (attach-tag 'complex (cons r i)))

(put 'raise '(integer) (lambda (n) (make-rational n 1)))
(put 'raise '(rational) (lambda (r) (make-real (* 1.0 (/ (car r) (cdr r))))))
(put 'raise '(real) (lambda (x) (make-complex x 0)))

(define (raise x)
  (apply-generic 'raise x))

; tests

(raise (make-integer 4)) (make-rational 4 1)
(raise (make-rational 5 2)) (make-real 2.5)
(raise (make-real 2.0)) (make-complex 2.0 0)
