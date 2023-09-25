#lang racket
(provide enumerate-interval enumerate-tree)

(define (enumerate-interval low high)
    (if (> low high)
        null
        (cons low (enumerate-interval (+ low 1) high))))

(define (enumerate-tree tree) 
    (cond ((null? tree) null)
          ((not (pair? tree)) (list tree))
          (else (append (enumerate-tree (car tree))
                        (enumerate-tree (cdr tree))))))
