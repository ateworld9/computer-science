/* eslint-disable no-bitwise */
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

function tsp(graph) {
	const numCities = graph.length;
	const allCities = (1 << numCities) - 1;

	const memo = Array.from({ length: numCities }, () =>
		Array(1 << numCities).fill(-1),
	);
	console.log(memo);
	function tspDP(currentCity, visited) {
		if (visited === allCities) {
			return graph[currentCity][0];
		}

		if (memo[currentCity][visited] !== -1) {
			return memo[currentCity][visited];
		}

		let minCost = Infinity;

		for (let nextCity = 0; nextCity < numCities; nextCity += 1) {
			if ((visited & (1 << nextCity)) === 0) {
				const newVisited = visited | (1 << nextCity);
				const cost = graph[currentCity][nextCity] + tspDP(nextCity, newVisited);
				minCost = Math.min(minCost, cost);
			}
		}

		memo[currentCity][visited] = minCost;
		return minCost;
	}

	// Начинаем с города 0 и ни один город не посещен
	return tspDP(0, 1);
}

async function main() {
	let str = await read();

	str = str.slice(0, -1);
	const lines = str.split('\n');
	const edgesCount = Number(lines[0]);

	const graph = [];

	for (let i = 1; i <= edgesCount; i += 1) {
		graph[i - 1] = lines[i].trim().split(' ').map(Number);
	}
	const res = tsp(graph);
	try {
		await fs.writeFile('output.txt', `${res}`);
	} catch (err) {
		console.error(err.message);
	}
}

main();
