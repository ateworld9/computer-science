#lang racket
(require "./enumerate.rkt")
; (require "./accumulate.rkt")
(require "./map.rkt")

(define empty-board '())
(define (adjoin-posiiton new-row k rest-of-queens) (cons (list new-row k) rest-of-queens))

(define (queen-at column positions)
  (if (= column (cadar positions))
      (car positions)
      (queen-at column (cdr positions))))

(define (all? proc seq)
  (cond ((null? seq) #t)
        ((proc (car seq)) (all? proc (cdr seq)))
        (else #f)))

(define (safe? k positions)
  (define queen-position (queen-at k positions))
  (let ((q1r (car queen-position))
        (q1c (cadr queen-position)))
    (all?
     (lambda (position)
       (let ((q2r (car position))
             (q2c (cadr position)))
         (or (and (= q1r q2r)
                  (= q1c q2c))
             (and (not (= q1r q2r))
                  (not (= q1c q2c))
                  (not (= (+ q1r q1c)
                          (+ q2r q2c)))
                  (not (= (- q1r q1c)
                          (- q2r q2c)))))))
     positions)))

(safe? 2 '((1 1) (3 2)))


(define (queens board-size)
  (define (queen-cols k)
    (if (= k 0)
        (list empty-board)
        (filter
         (lambda (positions) (safe? k positions))
         (flatmap
          (lambda (rest-of-queens)
            (map (lambda (new-row)
                   (adjoin-posiiton new-row k rest-of-queens))
                 (enumerate-interval 1 board-size)))
          (queen-cols (- k 1))))))
  (queen-cols board-size))

(newline)
(queens 4)
(newline)
(length(queens 8))
