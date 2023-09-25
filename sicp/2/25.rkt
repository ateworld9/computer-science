#lang racket

 (car 
    (cdr 
        (car 
            (cdr
                (cdr '(1 3 (5 7) 9))))))
(newline)
(caar '((7)))
