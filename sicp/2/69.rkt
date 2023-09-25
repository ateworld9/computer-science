#lang racket
(require "./haffman.rkt")
(provide generate-haffman-tree)

; (make-leaf-set '((A 4) (B 2) (C 1) (D 1)))

(define (generate-haffman-tree pairs)
  (successive-merge (make-leaf-set pairs) ))

(define (successive-merge set)
  (cond ((null? set) '())
        ((null? (cdr set)) (car set))
        (else (successive-merge
               (adjoin-set
                (make-code-tree (car set) (cadr set))
                (cddr set))))))

; (generate-haffman-tree '((A 4) (B 2) (C 1) (D 1)))
