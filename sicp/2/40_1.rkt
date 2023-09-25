#lang racket
(require "./accumulate.rkt")
(require "./filter.rkt")
(require "./enumerate.rkt")
(require "./prime.rkt")

(define n 6)

(enumerate-interval 1 n)
(newline)

(map (lambda (i)
       (map (lambda (j) (list i j))
            (enumerate-interval 1 (- i 1))))
     (enumerate-interval 1 n))
(newline)

(append '((2 1)) '((3 1) (3 2)))
(newline)

(accumulate append
            null
            (map (lambda (i)
                   (map (lambda (j) (list i j))
                        (enumerate-interval 1 (- i 1))))
                 (enumerate-interval 1 n)))
(newline)

(define (flatmap callback seq)
  (accumulate append null (map callback seq)))

(flatmap (lambda (i)
           (map (lambda (j) (list i j))
                (enumerate-interval 1 (- i 1))))
         (enumerate-interval 1 n))
(newline)

(define (prime-sum? pair)
  (prime? (+ (car pair) (cadr pair))))
(prime-sum? (cons 2 (list 3)))
(newline)

(define (make-pair-sum pair)
  (list (car pair) (cadr pair) (+ (car pair) (cadr pair))))
(make-pair-sum (cons 2 (list 3)))
(newline)


; (define (prime-sum-pairs m)
;   (map make-pair-sum (filter prime-sum?
;                              (flatmap
;                               (lambda (i)
;                                 (map (lambda (j) (list i j))
;                                      (enumerate-interval 1 (- i 1))))
;                               (enumerate-interval 1 m)))))
; (prime-sum-pairs 6)
; (newline)

(define (permutations s)
  (if (null? s)
      (list null)
      (flatmap (lambda (x)
                 (map (lambda (p) (cons x p))
                      (permutations (remove x s))))
               s)))
(permutations (list 1 2 3))
(newline)

(define (unique-pairs m)
  (flatmap
   (lambda (i)
     (map (lambda (j) (list i j))
          (enumerate-interval 1 (- i 1))))
   (enumerate-interval 1 m)))
(unique-pairs 6)
(newline)


(define (prime-sum-pairs m)
  (map make-pair-sum (filter prime-sum? (unique-pairs m))))
(prime-sum-pairs 6)
(newline)
