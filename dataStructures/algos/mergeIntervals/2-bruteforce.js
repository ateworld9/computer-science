/* eslint-disable no-param-reassign */
class Interval {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}
}

function mergeIntervals(intervals) {
	const set = new Set(intervals);

	set.forEach((i) => {
		set.forEach((j) => {
			if (j.start <= i.start && j.end >= i.end && j !== i) {
				set.delete(i);
			} else if (j.start <= i.start && j.end >= i.start && j !== i) {
				j.end = i.end;
				set.delete(i);
			}
		});
	});
	return Array.from(set);
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
