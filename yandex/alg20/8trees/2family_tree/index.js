const fs = require('fs/promises');
const path = require('path');

async function read(filename = 'input.txt') {
	try {
		return await fs.readFile(path.join(path.resolve(), filename), {
			encoding: 'utf8',
		});
	} catch (err) {
		console.error(err.message);
	}
}

function createNode(data) {
	return { parent: null, name: data, children: [] };
}

function find(tree, name) {
	if (tree?.name === name) {
		return tree;
	}
	for (let i = 0; i < tree?.children?.length; i++) {
		const res = find(tree.children[i], name);
		if (res !== null) {
			return res;
		}
	}
	return null;
}

async function main() {
	let str = await read('input.txt');
	str = str.slice(0, -1);
	const lines = str.split('\n');
	let n = +lines[0];
	let tree = null;
	for (let i = 1; i < n; i++) {
		const [child_name, parent_name] = lines[i].split(' ');
		let parent = find(tree, parent_name);
		if (parent === null) {
			parent = createNode(parent_name);
			if (tree === null) {
				tree = parent;
			}
		}
		const child = createNode(child_name);
		child.parent = parent;
		parent.children.push(child);
	}

	const result = [];
	while (n < lines.length) {
		const [first, second] = lines[n].split(' ');

		const firstNode = find(tree, first);
		const secondNode = find(tree, second);
		console.log(
			firstNode.name,
			firstNode.parent.name,
			secondNode.name,
			secondNode.parent,
		);
		if (firstNode.parent !== null && firstNode.parent.name === second) {
			result.push(2);
		} else if (secondNode.parent !== null && secondNode.parent.name === first) {
			result.push(1);
		} else {
			result.push(0);
		}
		n += 1;
	}
	try {
		await fs.writeFile('output.txt', result.join('\n'));
	} catch (err) {
		console.error(err.message);
	}
}

main();
