const fs = require('node:fs/promises');
const path = require('node:path');

async function read(filename = 'input.txt') {
	try {
		return await fs.readFile(path.join(path.resolve(), filename), {
			encoding: 'utf8',
		});
	} catch (err) {
		console.error(err.message);
		return -1;
	}
}

function findNearestVertex(distances, visited) {
	let minDistance = Infinity;
	let nearestVertex = null;

	Object.keys(distances).forEach((vertex) => {
		if (!visited[vertex] && distances[vertex] < minDistance) {
			minDistance = distances[vertex];
			nearestVertex = vertex;
		}
	});

	return nearestVertex;
}

function dijkstra(graph, start) {
	const visited = {};
	const distances = {};
	// const previous = {};

	const verticies = Object.keys(graph);
	verticies.forEach((vertex) => {
		distances[vertex] = Infinity;
		// previous[vertex] = null;
	});
	distances[start] = 0;

	function handleVertex(vertex) {
		// расстояние до вершины
		const activeVertexDistance = distances[vertex];
		const neighbours = graph[vertex];
		// для всех смежных вершин пересчитать расстояния
		Object.keys(neighbours).forEach((route) => {
			// const currentNeighbourDistance = distances[route.destinationVillage];
			// const newNeighbourDistance = activeVertexDistance + neighbours[route];
			if (
				neighbours[route].arrivalTime <
					distances[neighbours[route].destinationVillage] &&
				activeVertexDistance <= neighbours[route].departureTime
			) {
				distances[neighbours[route].destinationVillage] =
					neighbours[route].arrivalTime;
				// previous[route] = vertex;
			}
		});

		visited[vertex] = 1;
	}

	// ищем самую близкую вершину из необработанных
	let activeVertex = findNearestVertex(distances, visited);
	// продолжаем цикл, пока остаются необработанные вершины
	while (activeVertex) {
		handleVertex(activeVertex);
		activeVertex = findNearestVertex(distances, visited);
	}

	return distances;
}

async function main() {
	let str = await read();

	str = str.slice(0, -1);
	const lines = str.split('\n');

	const villagesCount = Number(lines[0]);

	const [startVillage, finalVillage] = lines[1].split(' ').map(Number);

	const routesCount = Number(lines[2]);

	const routes = {};

	for (let i = 1; i <= villagesCount; i += 1) {
		routes[i] = [];
	}

	for (let i = 0; i < routesCount; i += 1) {
		// fromVillage, departureTime, destinationVillage, arrivalTime
		const route = lines[i + 3].split(' ').map(Number);

		routes[route[0]].push({
			departureTime: route[1],
			destinationVillage: route[2],
			arrivalTime: route[3],
		});
	}
	// console.log(routes);

	const res = dijkstra(routes, startVillage);
	// console.log(res);
	try {
		await fs.writeFile(
			'output.txt',
			res[finalVillage] === Infinity ? '-1' : `${res[finalVillage]}`,
		);
	} catch (err) {
		console.error(err.message);
	}
}

main();
