#lang racket

(define (element-of-set? x set1)
  (cond ((null? set1) false)
        ((equal? x (car set1)) true)
        (else (element-of-set? x (cdr set1)))))


(define (union-set list1 list2)
  (cond ((null? list1) list2)
        ((null? list2) list1)
        ((= (car list1) (car list2))
         (cons (car list1) (union-set (cdr list1) (cdr list2))))
        ((< (car list1) (car list2))
         (cons (car list1) (union-set (cdr list1) list2)))
        ((> (car list1) (car list2))
         (cons (car list2) (union-set list1 (cdr list2))))))

(define (intersection-set set1 set2)
  (cond ((or (null? set1) (null? set2)) '())
        ((element-of-set? (car set1) set2)
         (cons (car set1)
               (intersection-set (cdr set1) set2)))
        (else (intersection-set (cdr set1) set2))))


(define (make-tree entry left right) (list entry left right))
(define (entry tree) (car tree))
(define (left-branch tree) (cadr tree))
(define (right-branch tree) (caddr tree))

(define (tree->list tree)
  (define (copy-to-list tree result-list)
    (if (null? tree)
        result-list
        (copy-to-list (left-branch tree)
                      (cons (entry tree)
                            (copy-to-list (right-branch tree) result-list)))))
  (copy-to-list tree '()))

(define (list->tree elements)
  (define (partial-tree elts n)
    (if (= n 0)
        (cons '() elts)
        (let ((left-size (quotient (- n 1) 2)))
          (let ((left-result (partial-tree elts left-size)))
            (let ((left-tree (car left-result))
                  (non-left-elts (cdr left-result))
                  (right-size (- n (+ left-size 1))))
              (let ((this-entry (car non-left-elts))
                    (right-result (partial-tree (cdr non-left-elts) right-size)))
                (let ((right-tree (car right-result))
                      (remaining-elts (cdr right-result)))
                  (cons (make-tree this-entry left-tree right-tree) remaining-elts))))))))
  (car (partial-tree elements (length elements))))



(define (union-set-tree set1 set2)
  (list->tree (union-set (tree->list set1) (tree->list set2))))
(define (intersection-set-tree set1 set2)
  (list->tree (intersection-set (tree->list set1) (tree->list set2))))

(tree->list (union-set-tree (list->tree '(1 3 5 7 9 11))  ; '(1 2 3 5 7 9 10 11))
                            (list->tree '(2 3 5 9 10))))

(tree->list (intersection-set-tree (list->tree '(1 3 5 7 9 11))  ; '(3 5 9))
                                   (list->tree '(2 3 5 9 10))))

