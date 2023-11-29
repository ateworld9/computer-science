import assert from "assert/strict";
import { BinarySearchTree } from "./BinarySearchTree";
import { traverseBF } from "./BinaryTree";

describe("BinarySearchTree", () => {
  test("builded correctly", () => {
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
    traverseBF(tree.root, result.push);

    assert.Equal(result, [8, 3, 10, 1, 6, 14, 4, 7, 13]);
  });
  // test('', () => {});
  // test('', () => {});
});
