#lang racket
(require "./tag.rkt")

; The type tower, supetype, supertype?, raise and project:
(put 'supertype 'integer 'rational)
(put 'supertype 'rational 'scheme-number)
(put 'supertype 'scheme-number 'real)
(put 'supertype 'real 'complex)

(define (supertype type)
  (get 'supertype type))

(define (supertype? a b)
  (let ((super (supertype a)))
    (cond ((equal? super b) #t)
          ((not super) #f)
          (else (supertype? super b)))))

(define (same-type? a b) (equal? (type-tag a) (type-tag b)))

(define (raise a) (apply-generic 'raise a))
(define (project a) (apply-generic 'project a))

(define (raisable? a) (get 'raise (list (type-tag a))))
(define (projectable? a) (get 'project (list (type-tag a))))

(define (simplify x)
  (cond ((not (projectable? x)) x)
        ((equ? (raise (project x)) x) (simplify (project x)))
        (else x)))

; Generic arithmemtic procedures:
(define (add x y) (apply-generic 'add x y))
(define (sub x y) (apply-generic 'sub x y))
(define (mul x y) (apply-generic 'mul x y))
(define (div x y) (apply-generic 'div x y))
(define (neg x) (apply-generic 'neg x))
(define (exp x y) (apply-generic 'exp x y))
(define (square-root x) (apply-generic 'square-root x))
(define (sine x) (apply-generic 'sine x))
(define (cosine x) (apply-generic 'cosine x))
(define (arctangent x y) (apply-generic 'arctangent x y))
(define (=zero? x) (apply-generic '=zero? x))
(define (square x) (mul x x))
(define (equ? x y) (apply-generic 'equ? x y))
(define (simplifiable? op) (get 'simplifiable op))

(put 'simplifiable 'add #t)
(put 'simplifiable 'sub #t)
(put 'simplifiable 'mul #t)
(put 'simplifiable 'div #t)
(put 'simplifiable 'neg #t)
(put 'simplifiable 'square-root #t)
(put 'simplifiable 'sine #t)
(put 'simplifiable 'cosine #t)
(put 'simplifiable 'arctangent #t)
(put 'simplifiable 'real-part #t)
(put 'simplifiable 'imag-part #t)
(put 'simplifiable 'magnitude #t)
(put 'simplifiable 'angle #t)

(define (make-real n) ((get 'make 'real) n))
(define (make-integer n) ((get 'make 'integer) n))

(define (make-rational n d)
  ((get 'make 'rational) n d))
(define (numer r) (apply-generic 'numer r))
(define (denom r) (apply-generic 'denom r))

; Generic procedures for complex numbers:
(define (real-part z) (apply-generic 'real-part z))
(define (imag-part z) (apply-generic 'imag-part z))
(define (magnitude z) (apply-generic 'magnitude z))
(define (angle z) (apply-generic 'angle z))
(define (make-from-real-imag x y)
  ((get 'make-from-real-imag 'rectangular) x y))
(define (make-from-mag-ang r a)
  ((get 'make-from-mag-ang 'polar) r a))
(define (make-complex-from-real-imag x y)
  ((get 'make-from-real-imag 'complex) x y))
(define (make-complex-from-mag-ang r a)
  ((get 'make-from-mag-ang 'complex) r a))
(define make-complex make-complex-from-real-imag)

; Generic procedures for polynoms:
(define (make-term order coeff) (list order coeff))
(define (order term) (car term))
(define (coeff term) (cadr term))

(define (empty-termlist? term-list) (apply-generic 'empty-termlist? term-list))
(define (first-term term-list) (apply-generic 'first-term term-list))
(define (rest-terms term-list) (apply-generic 'rest-terms term-list))

(define (adjoin-term term term-list)
  (let ((proc (get 'adjoin-term (type-tag term-list))))
    (if proc
        (proc term (contents term-list))
        (error "No method for these types - ADJOIN-TERM" term-list))))

(define (the-empty-sparse-termlist) ((get 'make 'sparse)))

(define (the-empty-dense-termlist) ((get 'make 'dense)))

(define (make-polynomial var terms)
  ((get 'make 'polynomial) var terms))

(define (poly var . coeffs)
  (define (value coeff)
    (cond ((and (number? coeff) (integer? coeff)) (make-integer coeff))
          ((number? coeff) (make-real coeff))
          (else coeff)))
  (define (to-term-list coeffs)
    (cond ((null? coeffs) '())
          ((=zero? (value (car coeffs))) (to-term-list (cdr coeffs)))
          (else (cons (list (- (length coeffs) 1) (value (car coeffs)))
                      (to-term-list (cdr coeffs))))))

  (make-polynomial var (to-term-list coeffs)))

(define (apply-generic op . args)
  (define (applicable? args)
    (get op (map type-tag args)))

  (define (apply-generic-failed)
    (error "No method for these types - APPLY-GENERIC" (list op (map type-tag args))))

  (define (all-of-same-type? args)
    (define (check rest)
      (cond ((null? rest) #t)
            ((same-type? (car args) (car rest)) (check (cdr rest)))
            (else #f)))
    (check args))

  (define (of-same-type-and-raisable? args)
    (and (all-of-same-type? args)
         (raisable? (car args))))

  (define (coercable-to-same-type? args)
    (and (= (length args) 2)
         (let ((type-a (type-tag (car args)))
               (type-b (type-tag (cadr args))))
           (or (supertype? type-a type-b)
               (supertype? type-b type-a)))))

  (define (coerce-to-same-type args)
    (and (= (length args) 2)
         (let* ((a (car args))
                (b (cadr args))
                (type-a (type-tag a))
                (type-b (type-tag b)))
           (cond ((same-type? a b) (list a b))
                 ((supertype? type-a type-b) (coerce-to-same-type (list (raise a) b)))
                 ((supertype? type-b type-a) (coerce-to-same-type (list a (raise b))))
                 (else #f)))))

  (define (attempt-coercion args)
    (cond ((of-same-type-and-raisable? args) (try (map raise args)))
          ((coercable-to-same-type? args) (try (coerce-to-same-type args)))
          (else (apply-generic-failed))))

  (define (try args)
    (if (applicable? args)
        (let ((result (apply (get op (map type-tag args)) (map contents args))))
          (if (simplifiable? op)
              (simplify result)
              result))
        (attempt-coercion args)))

  (try args))


(provide
 supertype
 supertype?
 same-type?
 raise
 raisable?
 project
 projectable?
 square-root
 sine
 cosine
 arctangent
 =zero?
 square
 equ?
 simplify
 simplifiable?

 add
 sub
 mul
 div
 neg
 exp
 make-integer
 make-real
 make-rational
 numer
 denom
 make-from-real-imag
 make-from-mag-ang
 real-part
 imag-part
 magnitude
 angle
 make-complex
 make-complex-from-real-imag
 make-complex-from-mag-ang

 make-term
 order
 coeff
 empty-termlist?
 first-term
 rest-terms
 adjoin-term

 the-empty-sparse-termlist

 the-empty-dense-termlist

 make-polynomial
 poly

 apply-generic
 )
