import assert from "assert/strict";
import { BinaryTreeNode, traverseBF, traverseDF } from "./BinaryTree";

test("BinarySearch", (t) => {
  t.test("traverseDF", () => {
    const aNode = new BinaryTreeNode("a");
    const bNode = new BinaryTreeNode("b");
    aNode.setLeft(bNode);
    const cNode = new BinaryTreeNode("c");
    aNode.setRight(cNode);
    const dNode = new BinaryTreeNode("d");
    bNode.setRight(dNode);
    const eNode = new BinaryTreeNode("e");
    cNode.setLeft(eNode);
    const fNode = new BinaryTreeNode("f");
    cNode.setRight(fNode);

    const result = [];

    traverseDF(aNode, result.push);
    assert.Equal(result, ["a", "b", "d", "c", "e", "f"]);
  });
  t.test("traverseBF", () => {
    const aNode = new BinaryTreeNode("a");
    const bNode = new BinaryTreeNode("b");
    aNode.setLeft(bNode);
    const cNode = new BinaryTreeNode("c");
    aNode.setRight(cNode);
    const dNode = new BinaryTreeNode("d");
    bNode.setRight(dNode);
    const eNode = new BinaryTreeNode("e");
    cNode.setLeft(eNode);
    const fNode = new BinaryTreeNode("f");
    cNode.setRight(fNode);

    const result = [];

    traverseBF(aNode, result.push);

    assert.Equal(result, "a", "b", "c", "d", "e", "f");
  });
});
