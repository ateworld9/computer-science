#lang racket
(require "./accumulate.rkt")

(define (count-leaves tree)
    (accumulate + 0 (map (lambda (x) 
                                    (if (pair? x) 
                                         (count-leaves tree)
                                         1)) 
                          tree)))
(count-leaves (list 1 2 3))
