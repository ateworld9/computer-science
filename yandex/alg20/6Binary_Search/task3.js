// Михаил читает лекции по алгоритмам.
// За кадром стоит доска размером W * H сантиметров.
// Михаилу нужно разместить на доске N квадратных стикеров со шпаргалками,
// при этом длинна стороны стикера должна быть целым числом

// Определите максимальную длинну стороны стикера,
// чтобы все стикеры поместились на доске

function rightBinarySearch(l, r, check, checkparams) {
	while (l < r) {
		const m = Math.ceil((l + r) / 2);
		if (check(m, checkparams)) l = m;
		else r = m - 1;
	}
	return l;
}

const checkstickers = (side, params) => {
	const [n, w, h] = params;
	return Math.trunc(w / side) * Math.trunc(h / side) >= n;
};

console.log(rightBinarySearch(0, 100, checkstickers, [10, 101, 15]));
