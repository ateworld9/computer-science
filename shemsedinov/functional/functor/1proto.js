//  'use strict'

function Maybe(x) {
  this.x = x;
}

Maybe.prototype.map = function (fn) {
  // if (this.x && fn) {
  // 	return new Maybe(fn(this.x))
  // }
  // return new Maybe(null)
  return this.x && fn ? new Maybe(fn(this.x)) : new Maybe(null);
};

console.log(new Maybe(5));
