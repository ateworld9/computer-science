#lang racket

(define (attach-tag type-tag contents)
  (if (equal? type-tag 'scheme-number)
      contents
      (cons type-tag contents)))

(define (type-tag datum)
  (cond ((number? datum) 'scheme-number)
        ((pair? datum) (car datum))
        (else (error "Bad tagged datum - TYPE-TAG" datum))))

(define (contents datum)
  (cond ((number? datum) datum)
        ((pair? datum) (cdr datum))
        (else (error "Bad tagged datum - CONTENTS" datum))))

(define table (make-hash))
(define (put op type item) (hash-set! table (list op type) item))
(define (get op type) (hash-ref table (list op type) #f))

(define (put-coercion from to op) (put 'coerce (list from to) op))
(define (get-coercion from to) (get 'coerce (list from to)))

(provide table attach-tag type-tag contents put get put-coercion get-coercion)
