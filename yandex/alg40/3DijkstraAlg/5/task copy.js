/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
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

function BFS(graph, vertexCount, source) {
	const distance = new Array(vertexCount).fill(Infinity);
	distance[source] = 0;
	const queue = [];
	queue.push(source);
	while (queue.length > 0) {
		const currentNode = queue.shift();
		if (currentNode == 0) {
			break;
		}
		Object.keys(graph[currentNode]).forEach((childNode) => {
			const newRoadLength =
				distance[currentNode] + graph[currentNode][childNode];
			if (
				distance[childNode] === Infinity ||
				newRoadLength < distance[childNode]
			) {
				distance[childNode] = newRoadLength;
				queue.push(childNode);
			}
		});
	}

	return distance;
}

function handleVertex(graph, distances, visited, previous, vertex) {
	const neighbours = graph[vertex];
	Object.keys(neighbours).forEach((el) => {
		// const [toV, time] = graph[vertex][el];
		const currentNeighbourDistance = distances[graph[vertex][el][0]];
		const newNeighbourDistance = distances[vertex] + graph[vertex][el][1];
		if (newNeighbourDistance < currentNeighbourDistance) {
			distances[graph[vertex][el][0]] = newNeighbourDistance;
			previous[graph[vertex][el][0]] = vertex;
		}
	});

	visited[vertex] = 1;
}

function dijkstra(graph, vertexCount, start) {
	const visited = new Array(vertexCount);
	const distances = new Array(vertexCount).fill(Infinity);
	const previous = [];
	previous[start] = -1;
	distances[start] = 0;
	let last = null;

	// ищем самую близкую вершину из необработанных

	let minDistance = Infinity;
	let nearestVertex = -1;

	distances.forEach((distance, vertex) => {
		if (!visited[vertex] && distance < minDistance) {
			minDistance = distance;
			nearestVertex = vertex;
		}
	});
	let activeVertex = nearestVertex;

	// продолжаем цикл, пока остаются необработанные вершины
	while (activeVertex !== -1) {
		handleVertex(graph, distances, visited, previous, activeVertex);
		last = activeVertex;

		minDistance = Infinity;
		nearestVertex = -1;
		// eslint-disable-next-line no-loop-func
		distances.forEach((distance, vertex) => {
			if (!visited[vertex] && distance < minDistance) {
				minDistance = distance;
				nearestVertex = vertex;
			}
		});
		activeVertex = nearestVertex;
	}
	// return [distances, previous];

	const way = [];
	let lastNode = last;
	while (lastNode !== -1) {
		way.push(+lastNode + 1);
		lastNode = previous[lastNode];
	}

	return [distances[last], way];
}

async function main() {
	let str = await read();

	str = str.slice(0, -1);
	const lines = str.split('\n');
	const citiesCount = Number(lines[0]);

	const cities = new Array(citiesCount);
	const graph = new Array(citiesCount);
	const graph2 = new Array(citiesCount);

	for (let i = 0; i < citiesCount; i += 1) {
		cities[i] = lines[i + 1].split(' ').map(Number); // [delay, speed]
		graph[i] = {};
		graph2[i] = [];
	}
	for (let i = 0; i < citiesCount - 1; i += 1) {
		const [a, b, dist] = lines[i + 1 + citiesCount].split(' ').map(Number);
		graph[a - 1][b - 1] = dist;
		graph[b - 1][a - 1] = dist;
	}
	console.time('bfs');
	// console.log('graph: ', graph);

	for (let city = 1; city < citiesCount; city += 1) {
		const distances = BFS(graph, citiesCount, city);
		distances.forEach((distance, i) => {
			if (i !== city && distance !== Infinity) {
				graph2[i].push([city, distance / cities[city][1] + cities[city][0]]);
			}
		});
	}

	console.timeEnd('bfs');
	console.time('dijkstra');
	const [distances, way] = dijkstra(graph2, citiesCount, 0);
	console.timeEnd('dijkstra');
	console.log(distances.toFixed(10), way.join(' '));

	try {
		await fs.writeFile(
			'output.txt',
			`${distances.toFixed(10)}\n${way.join(' ')}`,
		);
	} catch (err) {
		console.error(err.message);
	}
}

main();
