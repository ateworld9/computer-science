class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

function mergeIntervals(intervals) {
  // Create an empty stack of intervals
  const stack = [];
  // sort the intervals in increasing order of start time
  intervals.sort(intervals);
  // push the first interval to stack
  stack.push(intervals[0]);

  // Start from the next interval and merge if necessary
  for (let i = 1; i < intervals.length; i += 1) {
    // get interval from stack top
    const top = stack.at(-1);

    // if current interval is not overlapping with stack
    // top, push it to the stack
    if (top.end < intervals[i].start) {
      stack.push(intervals[i]);
    } else if (top.end < intervals[i].end) {
      // Otherwise update the ending time of top if ending
      // of current interval is more
      top.end = intervals[i].end;
      stack.pop();
      stack.push(top);
    }
  }
  return stack;
}
const intervals1 = [
  // [[1, 4], [6, 8], [9, 10]]
  new Interval(6, 8),
  new Interval(1, 3),
  new Interval(2, 4),
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
