#lang racket

(car ''abracadabra)
; transpile to
(car (quote (quote abracadabra)))

