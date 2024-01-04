/* eslint-disable no-param-reassign */
class Interval {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}
}

function mergeIntervals(intervals) {
	intervals.sort((a, b) => a.start - b.start);
	let index = 0;
	for (let i = 1; i < intervals.length; i += 1) {
		if (intervals[index].end >= intervals[i].start) {
			intervals[index].end = Math.max(intervals[index].end, intervals[i].end);
			intervals[index].start = Math.min(
				intervals[index].start,
				intervals[i].start,
			);
		} else {
			index += 1;
			intervals[index] = intervals[i];
		}
	}
	return { index: index + 1, result: intervals.slice(0, index + 1) };
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
