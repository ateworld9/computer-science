/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
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

function makeAdjaencyList(edges, vertexCount) {
	const adjaencyList = new Array(vertexCount + 1);
	edges.forEach(([a, b]) => {
		if (adjaencyList[a] === undefined) {
			adjaencyList[a] = b === undefined ? [] : [b];
		} else {
			adjaencyList[a].push(b);
		}
	});

	for (let i = 1; i <= vertexCount; i += 1) {
		if (adjaencyList[i] === undefined) {
			adjaencyList[i] = [];
		}
	}

	return adjaencyList;
}

function doDFS(graph, vertexCount) {
	const indegree = new Array(vertexCount + 1).fill(0);
	const result = [];
	const stack = [];

	for (let i = 1; i < vertexCount + 1; i += 1) {
		for (let j = 0; j < graph[i].length; j += 1) {
			indegree[graph[i][j]] += 1;
		}
	}

	for (let i = 1; i < vertexCount + 1; i += 1) {
		if (indegree[i] === 0) {
			stack.push(i);
		}
	}

	while (stack.length !== 0) {
		const currentVertex = stack.pop();
		result.push(currentVertex);

		for (let i = 0; i < graph[currentVertex].length; i += 1) {
			const neighbor = graph[currentVertex][i];
			indegree[neighbor] -= 1;

			if (indegree[neighbor] === 0) {
				stack.push(neighbor);
			}
		}
	}

	if (result.length !== vertexCount) {
		return -1;
	}

	return result;
}

async function main() {
	let str = await read();

	str = str.slice(0, -1);
	// parse file string

	let lines = str.split('\n').map((el) => el.split(' ').map(Number));

	const [n, m] = lines[0];
	if (m > 1) {
		lines = lines.slice(1, m + 1);
	} else {
		lines = lines.slice(1);
	}

	const graph = makeAdjaencyList(lines, n);
	// console.table(graph);
	const result = doDFS(graph, n);

	try {
		await fs.writeFile(
			'output.txt',
			result === -1 ? `${result}` : result.join(' '),
		);
	} catch (err) {
		console.error(err.message);
	}
}

main();
