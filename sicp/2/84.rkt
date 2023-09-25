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

(put 'supertype 'integer 'rational)
(put 'supertype 'rational 'real)
(put 'supertype 'real 'complex)

(define (supertype type)
  (get 'supertype type))

; Next, we implement a predicate that tells us whether one type is the
; supertype of another.

(define (supertype? parent child)
  (let ((type (supertype child)))
    (cond ((equal? type parent) #t)
          ((not type) #f)
          (else (supertype? parent type)))))


(define (apply-generic op . args)
  (let ((type-tags (map type-tag args)))
    (let ((proc (get op type-tags)))
      (cond (proc (apply proc (map contents args)))
            ((= (length type-tags) 2)
             (let ((type1 (car type-tags))
                   (type2 (cadr type-tags))
                   (x (car args))
                   (y (cadr args)))
               (cond ((supertype? type1 type2) (apply-generic op x (raise y)))
                     ((supertype? type2 type1) (apply-generic op (raise x) y))
                     (else (error "No method for these types - APPLY-GENERIC" (list op type-tags))))))
            (else (error "No method for these types - APPLY-GENERIC" (list op type-tags)))))))

(put 'foo '(integer integer) (lambda (x y) 'foo-integer))
(put 'foo '(rational rational) (lambda (x y) 'foo-rational))
(put 'foo '(real real) (lambda (x y) 'foo-real))
(put 'foo '(complex complex) (lambda (x y) 'foo-complex))

(define (foo x y) (apply-generic 'foo x y))

; tests

(supertype 'integer) 'rational
(supertype 'rational) 'real
(supertype 'real) 'complex
(supertype 'complex) #f

(supertype? 'rational 'integer)
(supertype? 'real 'integer)
(supertype? 'complex 'integer)
(supertype? 'real 'rational)
(supertype? 'complex 'rational)
(supertype? 'complex 'real)

(supertype? 'integer 'rational)
(supertype? 'integer 'real)
(supertype? 'integer 'complex)
(supertype? 'rational 'real)
(supertype? 'rational 'complex)
(supertype? 'real 'complex)

(foo (make-integer 1) (make-integer 1)) 'foo-integer
(foo (make-rational 1 2) (make-integer 1)) 'foo-rational
(foo (make-integer 1) (make-rational 1 2)) 'foo-rational
(foo (make-integer 1) (make-real 1.0)) 'foo-real
(foo (make-rational 1 2) (make-real 1.0)) 'foo-real
(foo (make-real 1.0) (make-integer 1)) 'foo-real
(foo (make-real 1.0) (make-rational 1 2)) 'foo-real
(foo (make-integer 1) (make-complex 1 2)) 'foo-complex
(foo (make-rational 1 2) (make-complex 1 2)) 'foo-complex
(foo (make-real 1.0) (make-complex 1 2)) 'foo-complex
(foo (make-complex 1 2) (make-integer 1)) 'foo-complex
(foo (make-complex 1 2) (make-rational 1 2)) 'foo-complex
(foo (make-complex 1 2) (make-real 1.0)) 'foo-complex
