#lang racket
(require "./69.rkt")
(require "./68.rkt")
(require "./haffman.rkt")

(define tree (generate-haffman-tree '((a 2)
                                      (boom 1)
                                      (Get 2) (job 2)
                                      (na 16) (Sha 3)
                                      (yip 9) (Wah 1))))

(define song '(Get a job
                   Sha na na na na na na na na
                   Get a job
                   Sha na na na na na na na na
                   Wah yip yip yip yip yip yip yip yip yip
                   Sha boom
                   ))

(encode song tree)
(decode (encode song tree) tree)
