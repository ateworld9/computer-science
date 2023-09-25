#lang racket
(require "./tag.rkt")

(require "./integer.rkt")
(require "./real.rkt")
(require "./rational.rkt")
(require "./complex.rkt")
(require "./polynomial.rkt")

(require "./op.rkt")

(install-integer-package)
(install-real-package)
(install-rational-package)
(install-complex-package)
(install-polynomial-package)

; tests
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


