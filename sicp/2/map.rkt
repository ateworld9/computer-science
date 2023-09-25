#lang racket

(require "accumulate.rkt")

(provide tree-map flatmap)

; (define (map proc items)
;   (if (null? items)
;       null
;       (cons (proc (car items))
;             (map proc (cdr items)))))

(define (flatmap callback seq)
  (accumulate append null (map callback seq)))

(define (tree-map fn tree)
  (map (lambda (sub-tree)
         (if (pair? sub-tree)
             (tree-map fn sub-tree)
             (fn sub-tree)))
       tree))

