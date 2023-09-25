#lang racket

(require racket/gui/base)
(require racket/draw)

(provide make-segment start-segment end-segment segments->painter)


(define (make-vect x y)
  (list x y))

(define (xcor-vect vect)
  (car vect))

(define (ycor-vect vect)
  (cadr vect))

(define (add-vect v1 v2)
  (make-vect (+ (xcor-vect v1)
                (xcor-vect v2))
             (+ (ycor-vect v1)
                (ycor-vect v2))))

(define (sub-vect v1 v2)
  (make-vect (- (xcor-vect v1)
                (xcor-vect v2))
             (- (ycor-vect v1)
                (ycor-vect v2))))

(define (scale-vect s v)
  (make-vect (* s (xcor-vect v))
             (* s (ycor-vect v))))



(define (origin-frame frame)
  (car frame))

(define (edge1-frame frame)
  (cadr frame))

(define (edge2-frame frame)
  (caddr frame))

(define (frame-coord-map frame)
  (lambda (v)
    (add-vect
     (origin-frame frame)
     (add-vect (scale-vect (xcor-vect v)
                           (edge1-frame frame))
               (scale-vect (ycor-vect v)
                           (edge2-frame frame))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Setting up a canvas
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(define pictures-in-a-row 6)
(define pictures-in-a-column 4)
(define picture-size 190)
(define picture-margin 20)

(define width
  (+ (* pictures-in-a-row picture-size)
     (* pictures-in-a-row picture-margin)
     picture-margin))

(define height
  (+ (* pictures-in-a-column picture-size)
     (* pictures-in-a-column picture-margin)
     picture-margin))

(define target (make-bitmap width height))
(define dc (new bitmap-dc% [bitmap target]))

(send dc translate 0 height)
(send dc scale 1 -1)
(send dc set-smoothing 'smoothed)
(send dc set-font (make-object font% 12 'system 'normal 'bold))
(send dc set-text-foreground "dim gray")

(define frame (new frame%
                   [label "Example"]
                   [width width]
                   [height (+ height 10)]))

(define canvas
  (new canvas% [parent frame]
       [paint-callback
        (lambda (canvas dc)
          (send dc draw-bitmap target 0 0))]))

(define (draw-line a b)
  (let ((original-pen (send dc get-pen)))
    (send dc set-pen "black" 1 'solid)

    (send dc draw-line (xcor-vect a) (ycor-vect a)
          (xcor-vect b) (ycor-vect b))

    (send dc set-pen original-pen)))


(define (make-segment start end)
  (list start end))

(define (start-segment segment)
  (car segment))

(define (end-segment segment)
  (cadr segment))

(define (segments->painter segment-list)
  (lambda (frame)
    (for-each
     (lambda (segment)
       (draw-line
        ((frame-coord-map frame) (start-segment segment))
        ((frame-coord-map frame) (end-segment segment))))
     segment-list)))
