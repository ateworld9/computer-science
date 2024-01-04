function bfs01(graph, source) {
	const distances = new Array(graph.length).fill(Infinity);
	distances[0] = source;
	const deque = [];
	deque.push(source);
	while (deque.length > 0) {
		const current = deque.shift();
		graph[current].forEach(([next, weight]) => {
			if (distances[next] > distances[current] + weight) {
				distances[next] = distances[current] + weight;
				if (weight === 0) {
					deque.unshift(next);
				} else if (weight === 1) {
					deque.push(next);
				}
			}
		});
	}
	return distances;
}

const graph = [
	/* 0: */ [
		[1, 1],
		[5, 0],
	],
	/* 1: */ [
		[0, 1],
		[2, 0],
		[3, 1],
	],
	/* 2: */ [
		[1, 0],
		[3, 0],
	],
	/* 3: */ [
		[1, 1],
		[2, 0],
		[4, 1],
		[5, 0],
	],
	/* 4: */ [
		[3, 1],
		[8, 1],
	],
	/* 5: */ [
		[0, 0],
		[3, 0],
		[6, 1],
	],
	/* 6: */ [
		[5, 1],
		[7, 0],
	],
	/* 7: */ [
		[6, 0],
		[8, 0],
	],
	/* 8: */ [
		[4, 1],
		[7, 0],
	],
];
const dist = bfs01(graph, 0);
console.log(dist[8]);
