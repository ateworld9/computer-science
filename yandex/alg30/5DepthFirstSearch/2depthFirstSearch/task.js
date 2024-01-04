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
		if (b !== undefined) {
			if (adjaencyList[b] === undefined) {
				adjaencyList[b] = [a];
			} else {
				adjaencyList[b].push(a);
			}
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
	const visited = new Array(vertexCount);
	let component = 1;

	function DFS(vertex) {
		visited[vertex] = component;
		for (let i = 0; i < graph[vertex].length; i += 1) {
			if (visited[graph[vertex][i]] === 0) {
				DFS(graph[vertex][i]);
			}
		}
	}

	function DepthFirstSearchIterative(vertex) {
		const stack = [];

		stack.push(vertex);
		while (stack.length !== 0) {
			vertex = stack.pop();
			if (visited[vertex] === undefined) {
				visited[vertex] = component;
				graph[vertex].forEach((el) => {
					stack.push(el);
				});
			}
		}
	}

	for (let i = 1; i < graph.length; i += 1) {
		if (visited[i] === undefined) {
			DepthFirstSearchIterative(i);
			component += 1;
		}
	}

	return visited;
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
	console.table(graph);
	const visited = doDFS(graph, n);
	// console.log(visited, visited.length);

	const result = [];
	for (let i = 1; i < visited.length; i += 1) {
		if (result[visited[i]] === undefined) {
			result[visited[i]] = [i];
		} else {
			result[visited[i]].push(i);
		}
	}

	let strr = '';
	for (let i = 1; i < result.length; i += 1) {
		strr = strr + result[i].length + '\n';
		strr = strr + result[i].join(' ') + '\n';
	}
	try {
		await fs.writeFile('output.txt', `${result.length - 1}\n${strr}`);
	} catch (err) {
		console.error(err.message);
	}
}

main();
