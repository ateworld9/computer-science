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

async function main() {
	const result = [];

	function createNode(data) {
		result.push('DONE');
		return { parent: null, value: data, left: null, right: null };
	}
	function addNode(tree, value) {
		if (tree.value > value) {
			if (tree.left === null) {
				tree.left = createNode(value);
				tree.left.parent = tree;
			} else {
				addNode(tree.left, value);
			}
		}
		if (tree.value < value) {
			if (tree.right === null) {
				tree.right = createNode(value);
				tree.right.parent = tree;
			} else {
				addNode(tree.right, value);
			}
		}
		if (tree.value === value) {
			result.push('ALREADY');
		}
	}

	function find(tree, value) {
		if (tree === null || tree.value === value) {
			return tree;
		}
		if (tree.value > value) {
			return find(tree.left, value);
		} else {
			return find(tree.right, value);
		}
	}
	let h = 0;

	function inorderTraversal(node, callback) {
		if (node !== null) {
			h += 1;
			inorderTraversal(node.left, callback);
			h -= 1;
			callback(node);
			h += 1;
			inorderTraversal(node.right, callback);
			h -= 1;
		}
	}
	let str = await read('input.txt');
	str = str.slice(0, -1);
	const lines = str.split('\n');
	let tree = null;
	lines.forEach((el) => {
		if (el[0] === 'A') {
			const [command, val] = el.split(' ');
			if (tree === null) {
				tree = createNode(+val);
			} else {
				addNode(tree, +val);
			}
		}
		if (el[0] === 'S') {
			const [command, val] = el.split(' ');
			const node = find(tree, +val);
			if (node === null) {
				result.push('NO');
			} else {
				result.push('YES');
			}
		}
		if (el[0] === 'P') {
			h = 0;
			inorderTraversal(tree, (node) => {
				const points = ''.padEnd(h, '.');
				result.push(`${points}${node.value}`);
			});
		}
	});
	try {
		await fs.writeFile('output.txt', result.join('\n'));
	} catch (err) {
		console.error(err.message);
	}
}

main();
