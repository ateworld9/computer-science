module.exports = function (points, x0, y0, zoom) {
	const gridSize = 10;
	const gridWidth = 200 / gridSize;
	const gridHeight = 200 / gridSize;

	const minX = x0 - 100 / zoom;
	const minY = y0 - 100 / zoom;
	const maxX = x0 + 100 / zoom;
	const maxY = y0 + 100 / zoom;

	const grid = [];
	for (let i = 0; i < gridSize; i += 1) {
		grid[i] = [];
		for (let j = 0; j < gridSize; j += 1) grid[i][j] = 0;
	}

	points.forEach((point) => {
		if (point.x < minX || point.x > maxX || point.y < minY || point.y > maxY)
			return;

		const i = Math.floor((point.x - minX) / gridWidth);
		const j = Math.floor((point.y - minY) / gridHeight);
		grid[i][j] += 1;
	});

	const result = [];
	for (let i = 0; i < gridSize; i += 1) {
		for (let j = 0; j < gridSize; j += 1) {
			if (grid[i][j] > 0) result.push({ i, j, count: grid[i][j] });
		}
	}

	result.sort((a, b) => {
		if (a.j < b.j) return -1;
		if (a.j > b.j) return 1;
		if (a.i < b.i) return -1;
		if (a.i > b.i) return 1;
		return 0;
	});

	return result;
};
