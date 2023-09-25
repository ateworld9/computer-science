#lang racket
(require rackunit rackunit/text-ui)

(define (below a b) (list 'below a b))
(define (beside a b) (list 'beside a b))

(define (up-split painter n)
  (if (= n 0)
      painter
      (let ((smaller (up-split painter (- n 1))))
        (below painter (beside smaller smaller)))))

(up-split 'a 1)
(newline)
'(below a (beside a a))
(newline)
(up-split 'a 2)
(newline)
'(below a
        (beside (below a
                       (beside a a))
                (below a
                       (beside a a))))
