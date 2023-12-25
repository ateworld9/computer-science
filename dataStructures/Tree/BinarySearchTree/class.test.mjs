import test from 'node:test';
import assert from 'node:assert/strict';

import { BinarySearchTree } from './class.mjs';
import { traverseBF } from '../BinaryTree/BinaryTree.mjs';

test('BinarySearchTree', async (t) => {
  await t.test('builded correctly', (t) => {
    const tree = new BinarySearchTree(8, (a, b) => a - b);
    tree.insert(3);
    tree.insert(10);
    tree.insert(14);
    tree.insert(1);
    tree.insert(6);
    tree.insert(4);
    tree.insert(7);
    tree.insert(13);

    const result = [];
    traverseBF(tree.root, (x) => {
      result.push(+x.value);
    });

    assert.deepStrictEqual(result, [8, 3, 10, 1, 6, 14, 4, 7, 13]);
  });
  // test('', () => {});
  // test('', () => {});
});
