// Задана отсортированная по неубыванию последовательность из N чисел и число X.

// Необходимо определить сколько раз число X входит в последовательность.
function leftBinarySearch(l, r, check, params) {
	while (l < r) {
		const m = Math.trunc((l + r) / 2);
		if (check(m, params)) r = m;
		else l = m + 1;
	}
	return l;
}

function checkIsGreater(index, params) {
	const [seq, x] = params;
	return seq[index] > x;
}

function checkIsGreaterOrEqual(index, params) {
	const [seq, x] = params;
	return seq[index] >= x;
}

function findFirst(seq, x, check) {
	let ans = leftBinarySearch(0, seq.length - 1, check, [seq, x]);

	if (!check(ans, [seq, x])) {
		return seq.length;
	}
	return ans;
}

const seq = [1, 2, 3, 4, 5, 5, 5, 5, 5, 6, 7, 8, 9];
const seq2 = [5, 5, 5, 5, 5, 6, 7, 8, 9];
const seq3 = [1, 2, 3, 4, 5, 5, 5, 5, 5];
const seq4 = [5, 5, 5, 5, 5];
const seq5 = [1, 2, 3, 4, 6, 7, 8, 9];

function countx(sequence, x) {
	const right = findFirst(sequence, x, checkIsGreater);
	const left = findFirst(sequence, x, checkIsGreaterOrEqual);
	// console.log(right, left);
	return right - left;
}

console.log(countx(seq, 5));
console.log(countx(seq2, 5));
console.log(countx(seq3, 5));
console.log(countx(seq4, 5));
console.log(countx(seq5, 5));
