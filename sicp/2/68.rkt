#lang racket
(require "./haffman.rkt")
(provide encode)

(define (encode message tree)
  (if (null? message)
      '()
      (append (encode-symbol (car message) tree)
              (encode (cdr message) tree))))

(define (encode-symbol symbol tree)
  (let ((left (left-branch tree))
        (right (right-branch tree)))
    (cond ((leaf? tree) '())
          ((member symbol (symbols left)) (cons 0 (encode-symbol symbol left)))
          ((member symbol (symbols right)) (cons 1 (encode-symbol symbol right)))
          (else (error "bad symbol - ENCODE-SYMBOL" symbol)))))


(define sample-tree
  (make-code-tree (make-leaf 'A 4)
                  (make-code-tree (make-leaf 'B 2)
                                  (make-code-tree (make-leaf 'D 1)
                                                  (make-leaf 'C 1)))))

(define sample-message '(A D A B B C A))

; (encode sample-message sample-tree)
