#lang racket
(require "./accumulate.rkt")

(define (dot-product v w)
  (accumulate + 0 (map * v w)))

(define (matrix-*-vector m v)
  (map (lambda (x) (dot-product v x)) m))

(define (transpose matrix)
  (accumulate-n cons '() matrix))


(define (matrix-*-matrix m n)
  ;   (let ((cols (transpose n)))
  (map (lambda (x) (matrix-*-vector m x)) n))


; (define matrix '((1 2 3 4) (4 5 6 6) (6 7 8 9)))
(matrix-*-vector '((1 2 3 4) (4 5 6 6) (6 7 8 9)) '(1 2 3 4))
(newline)
(transpose '((1 2 3 4) (4 5 6 6) (6 7 8 9)))
(newline)
(matrix-*-matrix '((1 2 3 4) (4 5 6 6) (6 7 8 9))
                 '((1 2 3 4) (4 5 6 6) (6 7 8 9)))
(newline)
