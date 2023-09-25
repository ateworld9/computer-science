#lang racket
(require "./tag.rkt")
(require "./op.rkt")

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

; Sparse representation:

(define (install-sparse-polynomial-package)
  (define (the-empty-termlist) '())
  (define (empty-termlist? term-list) (null? term-list))
  (define (first-term term-list) (car term-list))
  (define (rest-terms term-list) (cdr term-list))
  (define (adjoin-term term term-list)
    (cond ((=zero? (coeff term)) term-list)
          ((null? term-list) (list term))
          ((> (order (car term-list)) (order term))
           (cons (car term-list) (adjoin-term term (cdr term-list))))
          ((= (order (car term-list)) (order term))
           (adjoin-term (make-term (order term)
                                   (add (coeff term) (coeff (car term-list))))
                        (cdr term-list)))
          (else (cons term term-list))))

  (define (tag x) (attach-tag 'sparse x))
  (put 'empty-termlist? '(sparse) empty-termlist?)
  (put 'first-term '(sparse) first-term)
  (put 'rest-terms '(sparse) (lambda (l) (tag (rest-terms l))))
  (put 'adjoin-term 'sparse (lambda (term term-list) (tag (adjoin-term term term-list))))
  (put 'make 'sparse (lambda () (tag (the-empty-termlist))))
  'done_sparse)

(define (the-empty-sparse-termlist) ((get 'make 'sparse)))

; Dense representation:

(define (install-dense-polynomial-package)
  (define (the-empty-termlist) '())
  (define (term-list-order term-list) (- (length term-list) 1))
  (define (empty-termlist? term-list) (null? term-list))
  (define (first-term term-list) (make-term (term-list-order term-list) (car term-list)))
  (define (rest-terms term-list) (cdr term-list))
  (define (adjoin-term term term-list)
    (let ((term-list-order (term-list-order term-list))
          (term-order (order term)))
      (cond ((=zero? (coeff term)) term-list)
            ((= term-list-order term-order)
             (cons (add (coeff term) (car term-list))
                   (cdr term-list)))
            ((< term-order term-list-order)
             (cons (car term-list) (adjoin-term term (cdr term-list))))
            ((> term-order term-list-order)
             (adjoin-term term (cons (make-integer 0) term-list))))))

  (define (tag x) (attach-tag 'dense x))
  (put 'first-term '(dense) first-term)
  (put 'rest-terms '(dense) (lambda (l) (tag (rest-terms l))))
  (put 'empty-termlist? '(dense) empty-termlist?)
  (put 'adjoin-term 'dense (lambda (term term-list) (tag (adjoin-term term term-list))))
  (put 'make 'dense (lambda () (tag (the-empty-termlist))))
  'done_dense)

(define (the-empty-dense-termlist) ((get 'make 'dense)))

; The polynomial package. Operations between polynomials with the same
; representation will preserve the type of representation. Polynomials with
; operations of mixed representation will choose an arbitrary representation
; for the result.
(install-sparse-polynomial-package)
(install-dense-polynomial-package)
(define (install-polynomial-package)
  (define (make-poly variable term-list)
    (cons variable term-list))
  (define (variable p) (car p))
  (define (term-list p) (cdr p))

  (define (same-variable? v1 v2)
    (and (variable? v1) (variable? v2) (eq? v1 v2)))
  (define (variable? x) (symbol? x))

  (define (empty-termlist-of-type term-list)
    ((get 'make (type-tag term-list))))

  (define (add-terms L1 L2)
    (cond ((empty-termlist? L1) L2)
          ((empty-termlist? L2) L1)
          (else
           (let ((t1 (first-term L1)) (t2 (first-term L2)))
             (cond ((> (order t1) (order t2))
                    (adjoin-term t1 (add-terms (rest-terms L1) L2)))
                   ((< (order t1) (order t2))
                    (adjoin-term t2 (add-terms L1 (rest-terms L2))))
                   (else
                    (adjoin-term
                     (make-term (order t1) (add (coeff t1) (coeff t2)))
                     (add-terms (rest-terms L1) (rest-terms L2)))))))))
  (define (mul-terms L1 L2)
    (if (empty-termlist? L1)
        (empty-termlist-of-type L1)
        (add-terms (mul-term-by-all-terms (first-term L1) L2)
                   (mul-terms (rest-terms L1) L2))))
  (define (mul-term-by-all-terms t1 L)
    (if (empty-termlist? L)
        (empty-termlist-of-type L)
        (let ((t2 (first-term L)))
          (adjoin-term (make-term (+ (order t1) (order t2)) (mul (coeff t1) (coeff t2)))
                       (mul-term-by-all-terms t1 (rest-terms L))))))
  (define (map-terms proc L)
    (if (empty-termlist? L)
        (empty-termlist-of-type L)
        (let ((first (first-term L))
              (rest (rest-terms L)))
          (adjoin-term (make-term (order first) (proc (coeff first)))
                       (map-terms proc rest)))))
  (define (neg-terms L)
    (map-terms neg L))

  (define (add-poly p1 p2)
    (if (same-variable? (variable p1) (variable p2))
        (make-poly (variable p1)
                   (add-terms (term-list p1)
                              (term-list p2)))
        (error "Polynomials not in same var - ADD-POLY" (list p1 p2))))
  (define (mul-poly p1 p2)
    (if (same-variable? (variable p1) (variable p2))
        (make-poly (variable p1)
                   (mul-terms (term-list p1)
                              (term-list p2)))
        (error "Polynomials not in same var - MUL-POLY" (list p1 p2))))
  (define (sub-poly p1 p2)
    (if (same-variable? (variable p1) (variable p2))
        (add-poly p1 (neg-poly p2))
        (error "Polynomials not in same var - SUB-POLY" (list p1 p2))))
  (define (neg-poly p)
    (make-poly (variable p)
               (neg-terms (term-list p))))

  (define (make-const p n)
    (tag (make-poly (variable p)
                    (adjoin-term (make-term 0 (make-integer n))
                                 (empty-termlist-of-type (term-list p))))))

  (define (tag p) (attach-tag 'polynomial p))
  (put 'add '(polynomial polynomial) (lambda (p1 p2) (tag (add-poly p1 p2))))
  (put 'sub '(polynomial polynomial) (lambda (p1 p2) (tag (sub-poly p1 p2))))
  (put 'mul '(polynomial polynomial) (lambda (p1 p2) (tag (mul-poly p1 p2))))
  (put '=zero? '(polynomial) (lambda (p) (empty-termlist? (term-list p))))
  (put 'neg '(polynomial) (lambda (p) (tag (neg-poly p))))

  (put 'add '(integer polynomial) (lambda (n p) (add (make-const p n) (tag p))))
  (put 'mul '(integer polynomial) (lambda (n p) (mul (make-const p n) (tag p))))
  (put 'add '(polynomial integer) (lambda (p n) (add (make-integer n) (tag p))))
  (put 'mul '(polynomial integer) (lambda (p n) (mul (make-integer n) (tag p))))

  (put 'make 'polynomial (lambda (var terms) (tag (make-poly var terms)))))

(define (make-polynomial var terms)
  ((get 'make 'polynomial) var terms))


(provide install-polynomial-package)
