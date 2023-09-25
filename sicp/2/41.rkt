#lang racket
(require "./enumerate.rkt")
(require "./accumulate.rkt")

(define (flatmap callback seq)
  (accumulate append null (map callback seq)))

(define (enumerate-triples n)
  (flatmap (lambda (k)
             (flatmap (lambda (i)
                        (map (lambda (j) (list k i j ))
                             (enumerate-interval 1 (- i 1))))
                      (enumerate-interval 1 (- k 1))))
           (enumerate-interval 1 n)))

(enumerate-triples 5)

(define (sum nums) (accumulate + 0 nums))

(define (triple-sum n s)
  (filter (lambda (triple) (= s (sum triple))) (enumerate-triples n)))

(triple-sum 5 9)
