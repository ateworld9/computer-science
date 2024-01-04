import test from 'node:test';
import assert from 'node:assert/strict';

import {
	addNode,
	createNode,
	deleteNode,
	find,
	findMax,
	findMin,
	findNext,
	findPrev,
	inorderTraversal,
	postorderTraversal,
	preorderTraversal,
} from './functional.mjs';

function buildYandexTree() {
	const root = createNode(8);
	addNode(root, 3);
	addNode(root, 10);
	addNode(root, 14);
	addNode(root, 1);
	addNode(root, 6);
	addNode(root, 4);
	addNode(root, 7);
	addNode(root, 13);
	addNode(root, 9);
	//         8
	//       /   \
	//      3     10
	//     / \     /\
	//    1   6   9  14
	//       / \     /
	//      4   7   13
	return root;
}

function buildItmoTree() {
	const root = createNode(8);
	addNode(root, 3);
	addNode(root, 10);
	addNode(root, 1);
	addNode(root, 6);
	addNode(root, 14);
	addNode(root, 4);
	addNode(root, 7);
	addNode(root, 13);
	//         8
	//       /   \
	//      3     10
	//     / \     \
	//    1   6     14
	//       / \    /
	//      4   7  13
	return root;
	// inorderTraversal [1,3,4,6,7,8,10,13,14]
	// preorderTraversal [8,3,10,1,6,14,4,7,13]
	// postorderTraversal [1,4,7,6,3,13,14,10,8]
}

test('build binary tree test', async (t) => {
	await t.test('build yandex binary Tree', () => {
		const root = buildYandexTree();
		const result = [];
		preorderTraversal(root, (node) => {
			result.push(node.value);
		});

		//         8
		//       /   \
		//      3     10
		//     / \     /\
		//    1   6   9  14
		//       / \     /
		//      4   7   13
		const expected = [8, 3, 10, 1, 6, 9, 14, 4, 7, 13];
		assert.deepEqual(result, expected, `${result} not equal to ${expected}`);
	});
	await t.test('build itmo binary Tree', () => {
		const root = buildItmoTree();
		const result = [];
		preorderTraversal(root, (node) => {
			result.push(node.value);
		});

		const expected = [8, 3, 10, 1, 6, 14, 4, 7, 13];
		assert.deepEqual(result, expected, `${result} not equal to ${expected}`);
	});
});

test('test inorderTraversal of binarytree', async (t) => {
	const root = buildItmoTree();
	const result = [];
	inorderTraversal(root, (node) => {
		result.push(node.value);
	});
	const expected = [1, 3, 4, 6, 7, 8, 10, 13, 14];
	assert.deepEqual(result, expected, `${result} not equal to ${expected}`);
});

test('test preorderTraversal of binarytree', async (t) => {
	const root = buildItmoTree();
	const result = [];
	preorderTraversal(root, (node) => {
		result.push(node.value);
	});
	const expected = [8, 3, 10, 1, 6, 14, 4, 7, 13];
	assert.deepEqual(result, expected, `${result} not equal to ${expected}`);
});

test('test postorderTraversal of binarytree', async (t) => {
	const root = buildItmoTree();
	const result = [];
	postorderTraversal(root, (node) => {
		result.push(node.value);
	});
	const expected = [1, 4, 7, 6, 3, 13, 14, 10, 8];
	assert.deepEqual(result, expected, `${result} not equal to ${expected}`);
});

test('test find in binary tree', async (t) => {
	const root = buildYandexTree();
	assert.strictEqual(find(root, 3).value, 3);
	assert.strictEqual(find(root, 10).value, 10);
	assert.strictEqual(find(root, 14).value, 14);
	assert.strictEqual(find(root, 1).value, 1);
	assert.strictEqual(find(root, 6).value, 6);
	assert.strictEqual(find(root, 4).value, 4);
	assert.strictEqual(find(root, 7).value, 7);
	assert.strictEqual(find(root, 13).value, 13);
	assert.strictEqual(find(root, 9).value, 9);
});
test('test findMin', async (t) => {
	const root = buildItmoTree();
	assert.strictEqual(findMin(root).value, 1);
});
test('test findMax', async (t) => {
	const root = buildItmoTree();
	assert.strictEqual(findMax(root).value, 14);
	assert.strict;
});

test('test findNext', async (t) => {
	const root = buildYandexTree();
	assert.strictEqual(findNext(root).value, 9); // 8
	assert.strictEqual(findNext(root.left).value, 4); // 3
	assert.strictEqual(findNext(root.right).value, 13); // 10
	assert.strictEqual(findNext(root.left.left).value, 3); // 1
	assert.strictEqual(findNext(root.left.right).value, 7); // 6
	assert.strictEqual(findNext(root.right.left).value, 10); // 9
	assert.strictEqual(findNext(root.right.right), null); // 14
	assert.strictEqual(findNext(root.left.right.left).value, 6); // 4
	assert.strictEqual(findNext(root.left.right.right).value, 8); // 7
	assert.strictEqual(findNext(root.right.right.left).value, 14); // 13
});

test('test findPrev', async (t) => {
	const root = buildYandexTree();
	assert.strictEqual(findPrev(root).value, 7); // 8
	assert.strictEqual(findPrev(root.left).value, 1); // 3
	assert.strictEqual(findPrev(root.right).value, 9); // 10
	assert.strictEqual(findPrev(root.left.left), null); // 1
	assert.strictEqual(findPrev(root.left.right).value, 4); // 6
	assert.strictEqual(findPrev(root.right.left).value, 8); // 9
	assert.strictEqual(findPrev(root.right.right).value, 13); // 14
	assert.strictEqual(findPrev(root.left.right.left).value, 3); // 4
	assert.strictEqual(findPrev(root.left.right.right).value, 6); // 7
	assert.strictEqual(findPrev(root.right.right.left).value, 10); // 13
});

test('delete node test', async (t) => {
	await t.test('delete leaf', () => {
		const root = buildYandexTree();

		//         8
		//       /   \
		//      3     10
		//     / \     /\
		//    1   6   9  14
		//       / \     /
		//      4   7   13
		deleteNode(root, 4);
		//         8
		//       /   \
		//      3     10
		//     / \     /\
		//    1   6   9  14
		//         \     /
		//          7   13
		const result = [];
		preorderTraversal(root, (node) => {
			result.push(+node.value);
		});

		const expected = [8, 3, 10, 1, 6, 9, 14, 7, 13];
		assert.deepEqual(result, expected, `${result} not equal to ${expected}`);
	});

	await t.test('delete element with child', () => {
		const root = buildYandexTree();
		//         8
		//       /   \
		//      3     10
		//     / \     /\
		//    1   6   9  14
		//       / \     /
		//      4   7   13
		deleteNode(root, 14);
		//         8
		//       /   \
		//      3     10
		//     / \     /\
		//    1   6   9  13
		//       / \
		//      4   7
		const result = [];

		preorderTraversal(root, (node) => {
			result.push(node.value);
		});

		const expected = [8, 3, 10, 1, 6, 9, 13, 4, 7];
		assert.deepEqual(result, expected, `${result} not equal to ${expected}`);
	});

	await t.test('delete element with two children', () => {
		const root = buildItmoTree();
		//         8
		//       /   \
		//      3     10
		//     / \     \
		//    1   6     14
		//       / \    /
		//      4   7  13
		deleteNode(root, 3);
		//         8
		//       /   \
		//      4     10
		//     / \     \
		//    1   6     14
		//         \    /
		//          7  13

		const result = [];
		preorderTraversal(root, (node) => {
			result.push(node.value);
		});
		const expected = [8, 4, 10, 1, 6, 14, 7, 13];
		assert.deepEqual(result, expected, `${result} not equal to ${expected}`);
	});
});
