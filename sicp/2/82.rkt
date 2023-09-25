#lang racket

(define table (make-hash))

(define (put op type item)
  (hash-set! table (list op type) item))

(define (get op type)
  (hash-ref table (list op type) #f))

; Next, the coercion operations:

(define (put-coercion from to op)
  (put 'coerce (list from to) op))

(define (get-coercion from to)
  (get 'coerce (list from to)))

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

; Here's an intermediate version of apply-generic:

(define (apply-generic op . args)
  (define (id x) x)
  (define (get-coercion-or-id from to)
    (if (equal? from to)
        id
        (get-coercion from to)))
  (define (coerce-to args target-type)
    (let* ((type-tags (map type-tag args))
           (coercions (map (lambda (type) (get-coercion-or-id type target-type)) type-tags))
           (coerced-all? (not (memq #f coercions))))
      (if coerced-all?
          (map (lambda (coerce datum) (coerce datum)) coercions args)
          #f)))
  (define (find-coercion type-tags)
    (if (null? type-tags)
        #f
        (or (coerce-to args (car type-tags))
            (find-coercion (cdr type-tags)))))
  (let ((type-tags (map type-tag args)))
    (let ((proc (get op type-tags)))
      (if proc
          (apply proc (map contents args))
          (let ((coerced-args (find-coercion type-tags)))
            (if coerced-args
                (apply apply-generic op coerced-args)
                (error "No method for these types" (list op type-tags))))))))

; Now, let's introduce our types:

(define (make-a) (attach-tag 'a "a"))
(define (make-b) (attach-tag 'b "b"))
(define (make-c) (attach-tag 'c "c"))

; Not some coercion operations:

(put-coercion 'a 'b (lambda (x) (attach-tag 'b (string-append (contents x) "->" "b"))))

; Our operations would be nonsensical - foo, bar and baz.

(define (foo x y) (apply-generic 'foo x y))
(define (bar x y z) (apply-generic 'bar x y z))
(define (baz w x y z) (apply-generic 'baz w x y z))

(put 'foo '(a a) (lambda args (cons 'foo-a-a (map string->symbol args))))
(put 'foo '(b b) (lambda args (cons 'foo-b-b (map string->symbol args))))
(put 'bar '(a a a) (lambda args (cons 'bar-a-a-a (map string->symbol args))))
(put 'bar '(b b b) (lambda args (cons 'bar-b-b-b (map string->symbol args))))
(put 'baz '(a a a a) (lambda args (cons 'baz-a-a-a-a (map string->symbol args))))
(put 'baz '(b b b b) (lambda args (cons 'baz-b-b-b-b (map string->symbol args))))

; tests

(foo (make-a) (make-a)) '(foo-a-a a a)
(foo (make-a) (make-b)) '(foo-b-b a->b b)
(foo (make-b) (make-a)) '(foo-b-b b a->b)

(bar (make-a) (make-a) (make-a)) '(bar-a-a-a a a a)
(bar (make-a) (make-b) (make-b)) '(bar-b-b-b a->b b b)
(bar (make-b) (make-a) (make-b)) '(bar-b-b-b b a->b b)
(bar (make-b) (make-b) (make-a)) '(bar-b-b-b b b a->b)
(bar (make-a) (make-a) (make-b)) '(bar-b-b-b a->b a->b b)
(bar (make-a) (make-b) (make-a)) '(bar-b-b-b a->b b a->b)
(bar (make-b) (make-a) (make-a)) '(bar-b-b-b b a->b a->b)

(baz (make-a) (make-a) (make-a) (make-a)) '(baz-a-a-a-a a a a a)
(baz (make-a) (make-b) (make-b) (make-b)) '(baz-b-b-b-b a->b b b b)
(baz (make-b) (make-a) (make-b) (make-b)) '(baz-b-b-b-b b a->b b b)
(baz (make-b) (make-b) (make-a) (make-b)) '(baz-b-b-b-b b b a->b b)
(baz (make-b) (make-b) (make-b) (make-a)) '(baz-b-b-b-b b b b a->b)
