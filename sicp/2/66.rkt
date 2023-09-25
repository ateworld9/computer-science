#lang racket

(define (lookup given-key set-of-records)
  (if (null? set-of-records)
      #f
      (let* ((record (entry set-of-records))
             (record-key (key record)))
        (cond ((= given-key record-key) record)
              ((< given-key record-key) (lookup given-key (left-branch set-of-records)))
              ((> given-key record-key) (lookup given-key (right-branch set-of-records)))))))

(define (entry tree) (car tree))
(define (left-branch tree) (cadr tree))
(define (right-branch tree) (caddr tree))

(define (key record) (car record))
(define (name record) (cadr record))


(define a-tree
  '((99 a) ((50 b) ((25 c) ((12 d) () ())
                           ((42 e) ((30 f) () ())
                                   ()))
                   ((75 g) () ()))
           ()))

(define (name-for number)
  (let ((record (lookup number a-tree)))
    (if record
        (name record)
        #f)))

(name-for 99) ;a
(name-for 50) ;b
(name-for 25) ;c
(name-for 12) ;d
(name-for 42) ;e
(name-for 30) ;f
(name-for 75) ;g

(name-for 20)
