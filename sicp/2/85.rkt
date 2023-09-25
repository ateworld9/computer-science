#lang racket

(define table (make-hash))
(define (put op type item) (hash-set! table (list op type) item))
(define (get op type) (hash-ref table (list op type) #f))

; Next, the coercion operations:

(define (put-coercion from to op) (put 'coerce (list from to) op))
(define (get-coercion from to) (get 'coerce (list from to)))

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

; Now our types and the raise procedure.

(define (round-to-int x)
  (inexact->exact (truncate x)))

(define (make-integer n) (attach-tag 'integer n))
(define (make-rational n d)
  (let ((g (gcd n d)))
    (attach-tag 'rational (cons (round-to-int (/ n g))
                                (round-to-int (/ d g))))))
(define (make-real x) (attach-tag 'real x))
(define (make-complex r i) (attach-tag 'complex (cons r i)))

(put 'raise '(integer) (lambda (n) (make-rational n 1)))
(put 'raise '(rational) (lambda (r) (make-real (* 1.0 (/ (car r) (cdr r))))))
(put 'raise '(real) (lambda (x) (make-complex x 0)))

(define (raise x) (apply-generic 'raise x))

; Now, we are going to implement a procedure that returns the supertype of
; another type.

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

; Now we can define apply-generic:

(define (apply-generic op . args)
  (let ((type-tags (map type-tag args)))
    (let ((proc (get op type-tags)))
      (if proc
          (let ((result (apply proc (map contents args))))
            (if (and (= (length args) 2) (projectable? result))
                (drop-down result)
                result))
          (error "No method for these types - APPLY-GENERIC" (list op type-tags))))))

; Let's have an add operation we can use:

(put 'add '(integer integer) (lambda (x y) (make-integer (+ x y))))
(put 'add '(rational rational)
     (lambda (x y)
       (let* ((n1 (car x))
              (d1 (cdr x))
              (n2 (car y))
              (d2 (cdr y)))
         (make-rational (+ (* n1 d2) (* n2 d1))
                        (* d1 d2)))))
(put 'add '(real real) (lambda (x y) (make-real (+ x y))))
(put 'add '(complex complex)
     (lambda (z1 z2) (make-complex (+ (car z1) (car z2))
                                   (+ (cdr z1) (cdr z2)))))

(define (add x y) (apply-generic 'add x y))

; The equ? procedure:

(put 'equ? '(integer integer) =)
(put 'equ? '(rational rational) equal?)
(put 'equ? '(real real) =)
(put 'equ? '(complex complex) equal?)

(define (equ? x y) (apply-generic 'equ? x y))

; The project procedure:

(put 'project '(complex)
     (lambda (z) (make-real (car z))))
(put 'project '(real)
     (lambda (x) (make-rational (round-to-int (numerator x))
                                (round-to-int (denominator x)))))
(put 'project '(rational)
     (lambda (x) (make-integer (round-to-int (/ (car x) (cdr x))))))

(define (project x) (apply-generic 'project x))
(define (projectable? x) (and (pair? x) (get 'project (list (type-tag x)))))

; The drop procedure:

(define (drop-down x)
  (if (projectable? x)
      (let* ((projection (project x))
             (reraise (raise projection)))
        (if (equ? reraise x)
            (drop-down projection)
            x))
      x))

; Again, we do this for Racket scoping rules:
(define drop drop-down)

; tests
(equ? (make-integer 1) (make-integer 1))
(equ? (make-rational 1 2) (make-rational 2 4))
(equ? (make-real 1.5) (make-real 1.5))
(equ? (make-complex 1 2) (make-complex 1 2))

(equ? (make-integer 1) (make-integer 2))
(equ? (make-rational 1 2) (make-rational 1 3))
(equ? (make-rational 1 2) (make-rational 2 2))
(equ? (make-real 1.5) (make-real 2.5))
(equ? (make-complex 1 2) (make-complex 1 3))
(equ? (make-complex 1 2) (make-complex 2 2))

(project (make-complex 1.0 2.0)) (make-real 1.0)
(project (make-real 2.5)) (make-rational 25 10)
(project (make-rational 5 2)) (make-integer 2)

(drop (make-complex 1 2)) (make-complex 1 2)
(drop (make-complex 2.5 0)) (make-rational 5 2)
(drop (make-complex 1 0)) (make-integer 1)
(drop (make-real 2.5)) (make-rational 5 2)
(drop (make-real 1.0)) (make-integer 1)
(drop (make-rational 1 2)) (make-rational 1 2)
(drop (make-rational 1 1)) (make-integer 1)
(drop (make-integer 1)) (make-integer 1)

(add (make-complex 1 2) (make-complex 3 4)) (make-complex 4 6)
(add (make-complex 1 1) (make-complex 2 -1)) (make-integer 3)
(add (make-real 1.5) (make-real 2.5)) (make-integer 4)
