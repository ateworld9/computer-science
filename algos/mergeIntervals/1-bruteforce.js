/* eslint-disable no-param-reassign, prefer-destructuring, no-restricted-syntax */

class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

function merge(x, y) {
  if (x.end < y.start || y.end < x.start) {
    return false;
  }
  y.start = Math.min(y.start, x.start);
  y.end = Math.max(y.end, x.end);
  return true;
}

function mergeIntervals(intervals) {
  const n = intervals.length;
  const result = [];
  for (let i = 0; i < n; i += 1) {
    let merged = false;
    for (let j = 0; j < result.length; j += 1) {
      if (merge(intervals[i], result[j])) {
        merged = true;
        break;
      }
    }
    if (!merged) {
      result.push(intervals[i]);
    }
  }
  return result;
}

const intervals1 = [
  // [[1, 4], [6, 8], [9, 10]]
  new Interval(1, 3),
  new Interval(2, 4),
  new Interval(6, 8),
  new Interval(9, 10),
];
console.log(mergeIntervals(intervals1));
const intervals2 = [
  // [[1,9]]
  new Interval(6, 8),
  new Interval(1, 9),
  new Interval(2, 4),
  new Interval(4, 7),
];
console.log(mergeIntervals(intervals2));
