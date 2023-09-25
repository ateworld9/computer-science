#lang racket
(require "./tag.rkt")
; Here is our type tower, supetype, supertype?, raise and project:

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

(define (projectable? a) (get 'project (list (type-tag a))))
(define (raisable? a) (get 'raise (list (type-tag a))))

; Now a simplification procedure. It will be called simplify instead of drop,
; because drop is already reserved:

(define (simplify x)
  (cond ((not (projectable? x)) x)
        ((equ? (raise (project x)) x) (simplify (project x)))
        (else x)))

; Now the generic arithmemtic procedures. Note how square is defined in terms
; of a generic operation without using apply-generic.

(define (add x y) (apply-generic 'add x y))
(define (sub x y) (apply-generic 'sub x y))
(define (mul x y) (apply-generic 'mul x y))
(define (div x y) (apply-generic 'div x y))
(define (equ? x y) (apply-generic 'equ? x y))
(define (square-root x) (apply-generic 'square-root x))
(define (sine x) (apply-generic 'sine x))
(define (cosine x) (apply-generic 'cosine x))
(define (arctangent x y) (apply-generic 'arctangent x y))
(define (square x) (mul x x))

; Now some infrastructure for which operations can be simplified. We shall put
; them in the table under the key simplifiable. If an operation is present
; there, the result can be simplified. This is very nice, since apply-generic
; does not need to know which operations should be simplified - instead, when
; adding a new operation, the writer can decide whether it should simplify its
; result.

(define (simplifiable? op)
  (get 'simplifiable op))

(put 'simplifiable 'add #t)
(put 'simplifiable 'sub #t)
(put 'simplifiable 'mul #t)
(put 'simplifiable 'div #t)
(put 'simplifiable 'square-root #t)
(put 'simplifiable 'sine #t)
(put 'simplifiable 'cosine #t)
(put 'simplifiable 'arctangent #t)
(put 'simplifiable 'real-part #t)
(put 'simplifiable 'imag-part #t)
(put 'simplifiable 'magnitude #t)
(put 'simplifiable 'angle #t)

; And now - the integers. Note that they are not implementing div, since
; division of integers will result to a rational. Also note, that if you
; construct an integer with make-integer, you need to pass in an exact
; integer, otherwise you get an error.

(let ()
  (define (tag x) (attach-tag 'integer x))
  (put 'add '(integer integer) (lambda (x y) (tag (+ x y))))
  (put 'sub '(integer integer) (lambda (x y) (tag (- x y))))
  (put 'mul '(integer integer) (lambda (x y) (tag (* x y))))
  (put 'equ? '(integer integer) =)
  (put 'raise '(integer) (lambda (n) (make-rational n 1)))
  (put 'make 'integer
       (lambda (n) (if (exact-integer? n)
                       (tag n)
                       (error "Attempted to make an integer with a non-integer" n)))))

(define (make-integer n) ((get 'make 'integer) n))

; The next one is the rational numbers:

(let ()
  (define (numer x) (car x))
  (define (denom x) (cdr x))
  (define (make-rat n d)
    (if (and (exact-integer? n) (exact-integer? d))
        (let ((g (gcd n d)))
          (cons (/ n g) (/ d g)))
        (error "Cannot construct a rational with non-exact numbers" n d)))

  (define (add-rat x y)
    (make-rat (+ (* (numer x) (denom y))
                 (* (numer y) (denom x)))
              (* (denom x) (denom y))))
  (define (sub-rat x y)
    (make-rat (- (* (numer x) (denom y))
                 (* (numer y) (denom x)))
              (* (denom x) (denom y))))
  (define (mul-rat x y)
    (make-rat (* (numer x) (numer y))
              (* (denom x) (denom y))))
  (define (div-rat x y)
    (make-rat (* (numer x) (denom y))
              (* (denom x) (numer y))))
  (define (raise-rat r)
    (make-scheme-number (/ (numer r) (denom r))))
  (define (project-rat r)
    (make-integer (truncate (/ (numer r) (denom r)))))

  (define (tag x) (attach-tag 'rational x))
  (put 'numer '(rational) numer)
  (put 'denom '(rational) denom)
  (put 'raise '(rational) raise-rat)
  (put 'project '(rational) project-rat)
  (put 'add '(rational rational) (lambda (x y) (tag (add-rat x y))))
  (put 'sub '(rational rational) (lambda (x y) (tag (sub-rat x y))))
  (put 'mul '(rational rational) (lambda (x y) (tag (mul-rat x y))))
  (put 'div '(rational rational) (lambda (x y) (tag (div-rat x y))))
  (put 'equ? '(rational rational) equal?)
  (put 'make 'rational (lambda (n d) (tag (make-rat n d)))))

(define (make-rational n d) ((get 'make 'rational) n d))
(define (numer r) (apply-generic 'numer r))
(define (denom r) (apply-generic 'denom r))

; And now, the ever-mysterious scheme-numbers. Note that they are inbetween
; the rationals and the reals. This is somehow uncool, since we'll never get a
; real as a result form our operations because of simplification. At least it
; is less writing in the tests.

(let ()
  (put 'add '(scheme-number scheme-number) +)
  (put 'sub '(scheme-number scheme-number) -)
  (put 'mul '(scheme-number scheme-number) *)
  (put 'div '(scheme-number scheme-number) /)
  (put 'equ? '(scheme-number scheme-number) =)
  (put 'sine '(scheme-number) sin)
  (put 'cosine '(scheme-number) cos)
  (put 'square-root '(scheme-number scheme-number) sqrt)
  (put 'arctangent '(scheme-number scheme-number) atan)
  (put 'project '(scheme-number) (lambda (x) (make-rational (inexact->exact (truncate x)) 1)))
  (put 'raise '(scheme-number) (lambda (x) (make-real (exact->inexact x)))))

(define (make-scheme-number x) (attach-tag 'scheme-number x))

; Then the real numbers. They are pretty much the same as the integers,
; although without the exact-integer check.

(let ()
  (define (tag x) (attach-tag 'real x))
  (put 'add '(real real) (lambda (x y) (tag (+ x y))))
  (put 'sub '(real real) (lambda (x y) (tag (- x y))))
  (put 'mul '(real real) (lambda (x y) (tag (* x y))))
  (put 'div '(real real) (lambda (x y) (tag (/ x y))))
  (put 'sine '(real) (lambda (x) (tag (sin x))))
  (put 'cosine '(real) (lambda (x) (tag (cos x))))
  (put 'square-root '(real) (lambda (x) (tag (sqrt x))))
  (put 'arctangent '(real real) (lambda (x y) (tag (atan x y))))
  (put 'project '(real) (lambda (x) (make-scheme-number x)))
  (put 'raise '(real) (lambda (x) (make-complex-from-real-imag (tag x) (tag 0.0))))
  (put 'equ? '(real real) =)
  (put 'make 'real (lambda (x) (tag x))))

(define (make-real n) ((get 'make 'real) n))

; Now we need the complex numbers. They are trickier. We start with the
; generic procedures:

(define (real-part z) (apply-generic 'real-part z))
(define (imag-part z) (apply-generic 'imag-part z))
(define (magnitude z) (apply-generic 'magnitude z))
(define (angle z) (apply-generic 'angle z))

(define (make-from-real-imag x y) ((get 'make-from-real-imag 'rectangular) x y))
(define (make-from-mag-ang r a) ((get 'make-from-mag-ang 'polar) r a))

; They are followed by the rectangular representation. Note that it is
; implemented in terms of the generic procedures we defined earlier.

(let ()
  (define (real-part z) (car z))
  (define (imag-part z) (cdr z))
  (define (make-from-real-imag x y) (cons x y))
  (define (magnitude z) (square-root (add (square (real-part z)) (square (imag-part z)))))
  (define (angle z) (arctangent (imag-part z) (real-part z)))
  (define (make-from-mag-ang r a) (cons (mul r (cosine a)) (mul r (sine a))))

  (define (tag x) (attach-tag 'rectangular x))
  (put 'real-part '(rectangular) real-part)
  (put 'imag-part '(rectangular) imag-part)
  (put 'angle '(rectangular) angle)
  (put 'magnitude '(rectangular) magnitude)
  (put 'make-from-real-imag 'rectangular (lambda (x y) (tag (make-from-real-imag x y))))
  (put 'make-from-mag-ang 'rectangular (lambda (r a) (tag (make-from-mag-ang r a)))))

; The polar package is similar.

(let ()
  (define (magnitude z) (car z))
  (define (angle z) (cdr z))
  (define (make-from-mag-ang r a) (cons r a))
  (define (real-part z) (mul (magnitude z) (cosine (angle z))))
  (define (imag-part z) (mul (magnitude z) (sine (angle z))))
  (define (make-from-real-imag x y) (cons (square-root (add (square x) (square y)))
                                          (arctangent y x)))

  (define (tag x) (attach-tag 'polar x))
  (put 'real-part '(polar) real-part)
  (put 'imag-part '(polar) imag-part)
  (put 'magnitude '(polar) magnitude)
  (put 'angle '(polar) angle)
  (put 'make-from-real-imag 'polar (lambda (x y) (tag (make-from-real-imag x y))))
  (put 'make-from-mag-ang 'polar (lambda (r a) (tag (make-from-mag-ang r a)))))

; And finally, the complex package:

(let ()
  (define (make-from-real-imag x y)
    ((get 'make-from-real-imag 'rectangular) x y))
  (define (make-from-mag-ang r a)
    ((get 'make-from-mag-ang 'polar) r a))

  (define (add-complex z1 z2)
    (make-from-real-imag (add (real-part z1) (real-part z2))
                         (add (imag-part z1) (imag-part z2))))
  (define (sub-complex z1 z2)
    (make-from-real-imag (sub (real-part z1) (real-part z2))
                         (sub (imag-part z1) (imag-part z2))))
  (define (mul-complex z1 z2)
    (make-from-mag-ang (mul (magnitude z1) (magnitude z2))
                       (add (angle z1) (angle z2))))
  (define (div-complex z1 z2)
    (make-from-mag-ang (div (magnitude z1) (magnitude z2))
                       (sub (angle z1) (angle z2))))
  (define (equ?-complex z1 z2)
    (and (equ? (real-part z1) (real-part z2))
         (equ? (imag-part z1) (imag-part z2))))

  (define (tag x) (attach-tag 'complex x))
  (put 'real-part '(complex) real-part)
  (put 'imag-part '(complex) imag-part)
  (put 'magnitude '(complex) magnitude)
  (put 'angle '(complex) angle)
  (put 'add '(complex complex) (lambda (z1 z2) (tag (add-complex z1 z2))))
  (put 'sub '(complex complex) (lambda (z1 z2) (tag (sub-complex z1 z2))))
  (put 'mul '(complex complex) (lambda (z1 z2) (tag (mul-complex z1 z2))))
  (put 'div '(complex complex) (lambda (z1 z2) (tag (div-complex z1 z2))))
  (put 'equ? '(complex complex) equ?-complex)
  (put 'project '(complex) (lambda (z) (real-part z)))
  (put 'make-from-real-imag 'complex (lambda (x y) (tag (make-from-real-imag x y))))
  (put 'make-from-mag-ang 'complex (lambda (r a) (tag (make-from-mag-ang r a)))))

(define (make-complex-from-real-imag x y) ((get 'make-from-real-imag 'complex) x y))
(define (make-complex-from-mag-ang r a) ((get 'make-from-mag-ang 'complex) r a))
(define make-complex make-complex-from-real-imag)

; The apply-generic procedure is at the end, because it uses procedures that
; are redefined (such as raise). It is fairly complicated. When it is called
; with a number of arguments, it looks them up in the table and if a procedure
; is present, it calls it. Otherwise, it checks if all the arguments passed to
; it are of the same type and if so, it raises them all and tries again. There
; is an internal recursion in order to provide a good error message -
; otherwise the original arguments will get lost and then error will include
; the raised types.

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
    (let ((number-of-arguments (length args)))
      (cond ((of-same-type-and-raisable? args) (try (map raise args)))
            ((coercable-to-same-type? args) (try (coerce-to-same-type args)))
            (else (apply-generic-failed)))))

  (define (try args)
    (if (applicable? args)
        (let ((result (apply (get op (map type-tag args)) (map contents args))))
          (if (simplifiable? op)
              (simplify result)
              result))
        (attempt-coercion args)))

  (try args))



"type tower"; "type tower"
(supertype? 'integer 'rational)
(supertype? 'integer 'real)
(supertype? 'integer 'complex)
(supertype? 'rational 'real)
(supertype? 'rational 'complex)
(supertype? 'real 'complex)


"integers"; "integers"
(exn? (lambda () (make-integer 1.5)))
(add (make-integer 1) (make-integer 2)) (make-integer 3)
(sub (make-integer 3) (make-integer 2)) (make-integer 1)
(mul (make-integer 2) (make-integer 4)) (make-integer 8)
(equ? (make-integer 1) (make-integer 1))
(equ? (make-integer 1) (make-integer 2))
(raise (make-integer 2)) (make-rational 2 1)


"rationals"; "rationals"
(exn? (lambda () (make-rational 1.5 1)))
(exn? (lambda () (make-rational 1 1.5)))
(add (make-rational 1 2) (make-rational 3 4)) (make-rational 5 4)
(sub (make-rational 3 4) (make-rational 1 2)) (make-rational 1 4)
(mul (make-rational 2 3) (make-rational 3 6)) (make-rational 1 3)
(div (make-rational 5 4) (make-rational 1 2)) (make-rational 5 2)
(raise (make-rational 5 2)) (/ 5 2)
(equ? (make-rational 1 2) (make-rational 2 4)) #true
(equ? (make-rational 1 2) (make-rational 1 3)) #false
(project (make-rational 5 2)) (make-integer 2)


"scheme numbers"; "scheme numbers"
(type-tag 1) 'scheme-number
(contents 1) 1
(attach-tag 'scheme-number 1) 1
(add 1 2) (make-integer 3)
(sub 3 2) (make-integer 1)
(mul 2 4) (make-integer 8)
(div 8 4) (make-integer 2)
(sine 1) (sin 1)
(cosine 1) (cos 1)
(arctangent 3 4) (atan 3 4)
(project 4.5) (make-rational 4 1)
(raise 4.5) (make-real 4.5)
(equ? 1 1) #true
(equ? 2 3) #false


"reals"; "reals"
(add (make-real 1.5) (make-real 2.0)) 3.5
(sub (make-real 3.5) (make-real 2.0)) 1.5
(mul (make-real 1.25) (make-real 2.0)) 2.5
(div (make-real 5.0) (make-real 2.0)) 2.5
(sine (make-real 1.0)) (sin 1.0)
(cosine (make-real 1.0)) (cos 1.0)
(square-root (make-real 2.0)) (sqrt 2.0)
(arctangent (make-real 3.0) (make-real 4.0)) (atan 3.0 4.0)
(equ? (make-real 2.5) (make-real 2.5)) #true
(equ? (make-real 2.0) (make-real 2.5)) #false
(project (make-real 2.5)) 2.5


"coercions among numbers"; "coercions among numbers"
(div (make-integer 1) (make-integer 2)) (make-rational 1 2)
(add (make-integer 1) (make-rational 1 2)) (make-rational 3 2)
(add (make-integer 1) (make-real 2.5)) 3.5
(sine (make-integer 1)) (sin 1.0)
(sine (make-rational 2 2)) (sin 1.0)
(arctangent (make-integer 3) (make-integer 4)) (atan 3.0 4.0)


"simplification"; "simplification"
(simplify (make-rational 2 1)) (make-integer 2)
(simplify (/ 2 1)) (make-integer 2)
(simplify (make-real 4.0)) (make-integer 4)
(simplify 2.5) 2.5
(simplify (make-real 2.5)) 2.5


"complex numbers with various coercions and simplifications"; "complex numbers with various coercions and simplifications"
(add (make-complex (make-real 1.0) (make-real 2.0))
     (make-complex (make-real 3.0) (make-real 4.0)))
(make-complex (make-integer 4) (make-integer 6))
(sub (make-complex (make-real 3.0) (make-real 5.0))
     (make-complex (make-real 1.0) (make-real 2.0)))
(make-complex (make-integer 2) (make-integer 3))
(mul (make-complex (make-real 3.0) (make-real 4.0))
     (make-complex (make-real 6.0) (make-real 8.0)))
(make-complex-from-mag-ang (make-integer 50)
                           (+ (atan 4.0 3.0)
                              (atan 8.0 6.0)))
(div (make-complex (make-real 6.0) (make-real 8.0))
     (make-complex (make-real 3.0) (make-real 4.0)))
(make-integer 2)
(equ? (make-complex (make-real 1.0) (make-real 2.0))
      (make-complex (make-real 1.0) (make-real 2.0))) #true
(equ? (make-complex (make-real 1.0) (make-real 2.0))
      (make-complex (make-integer 1) (make-integer 2))) #true
(mul (make-complex-from-mag-ang (make-integer 2) (make-rational 2 1))
     (make-complex-from-mag-ang (make-real 3) (make-real 4)))
(make-complex-from-mag-ang (make-integer 6) (make-integer 6))

(real-part (make-complex-from-mag-ang (make-real 5)
                                      (make-real (atan 4 3))))
(* 5 (cos (atan 4 3)))
(imag-part (make-complex-from-mag-ang (make-real 5)
                                      (make-real (atan 4 3))))
(* 5 (sin (atan 4 3)))
(mul (make-complex-from-mag-ang (make-integer 2) (make-rational 2 1))
     (make-complex-from-mag-ang 3 (make-real 4)))
(make-complex-from-mag-ang (make-integer 6) (make-integer 6))


