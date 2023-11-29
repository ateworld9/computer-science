import test from 'node:test';
import assert from 'node:assert/strict';
import { BinaryTreeNode, traverseBF, traverseDF } from './BinaryTree.mjs';

test('BinarySearch', async (t) => {
  await t.test('traverseDF', (t) => {
    const aNode = new BinaryTreeNode('a');
    const bNode = new BinaryTreeNode('b');
    aNode.setLeft(bNode);
    const cNode = new BinaryTreeNode('c');
    aNode.setRight(cNode);
    const dNode = new BinaryTreeNode('d');
    bNode.setRight(dNode);
    const eNode = new BinaryTreeNode('e');
    cNode.setLeft(eNode);
    const fNode = new BinaryTreeNode('f');
    cNode.setRight(fNode);

    const result = [];

    traverseDF(aNode, (el) => {
      result.push(el.value);
    });
    assert.deepStrictEqual(result, ['a', 'b', 'd', 'c', 'e', 'f']);
  });
  await t.test('traverseBF', (t) => {
    const aNode = new BinaryTreeNode('a');
    const bNode = new BinaryTreeNode('b');
    aNode.setLeft(bNode);
    const cNode = new BinaryTreeNode('c');
    aNode.setRight(cNode);
    const dNode = new BinaryTreeNode('d');
    bNode.setRight(dNode);
    const eNode = new BinaryTreeNode('e');
    cNode.setLeft(eNode);
    const fNode = new BinaryTreeNode('f');
    cNode.setRight(fNode);

    const result = [];

    traverseBF(aNode, (el) => {
      result.push(el.value);
    });

    assert.deepStrictEqual(result, ['a', 'b', 'c', 'd', 'e', 'f']);
  });
});
