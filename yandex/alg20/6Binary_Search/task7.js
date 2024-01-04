// Велосипедисты, участвующие в шоссейной гонке, в некоторый момент времени,
// который называется начальным, оказались в точках,
// удаленных от места старта на x_1, x_2, ..., x_n метров
// (n - общее число велосипедистов, <= 100_000).
// Каждый велосипедист двигается со совей
// постоянной скоростью v_1, v_2, ...,v_n метров в секунду.
// Все велосипедисты двигаются в одну и ту же сторону.

// Репортёр, освещающий ход соревнований, хочет определить момент времени,
// в который расстояние между лидирующем в гонке велосипедистом и
// замыкающим гонку велосипедистом станет минимальным,
// чтобы с вертолета сфотографировать сразу всех учасников велогонки

// Необходимо найти момент времени, когда расстояние станет минимальным

function dist(t, params) {
	const [x, v] = params;

	let minpos = x[0] + v[0] * t;
	let maxpos = x[0] + v[0] * t;
	for (let i = 0; i < x.length; i += 1) {
		let nowpos = x[i] + v[i] * t;
		minpos = Math.min(minpos, nowpos);
		maxpos = Math.max(maxpos, nowpos);
	}
	return maxpos - minpos;
}

function checkasc(t, eps, params) {
	return dist(t + eps, params) >= dist(t, params);
}

function floatBinarySearch(l, r, eps, check, params) {
	while (l + eps < r) {
		const m = (l + r) / 2;
		if (check(m, eps, params)) r = m;
		else l = m;
		return l;
	}
}

const x = [];
const v = [];
const eps = 0.01;

floatBinarySearch(0, x.length - 1, eps, checkasc, [x, v]);
