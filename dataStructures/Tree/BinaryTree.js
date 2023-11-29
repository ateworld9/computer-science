/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable max-classes-per-file */

import { Queue } from "../Queue";

export class BinaryTreeNode {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;
  }

  get height() {
    const leftHeight = this.left ? this.left.height + 1 : 0;
    const rightHeight = this.right ? this.right.height + 1 : 0;
    return Math.max(leftHeight, rightHeight);
  }

  setLeft(node) {
    if (this.left) {
      this.left.parent = null;
    }
    if (node) {
      this.left = node;
      this.left.parent = this;
    }
  }

  setRight(node) {
    if (this.right) {
      this.right.parent = null;
    }
    if (node) {
      this.right = node;
      this.right.parent = this;
    }
  }
}

export function traverseDF(root, callback) {
  // simple DFS for tree
  function traverseDFRecursive(node, callback) {
    // выполнение коллбэка для самого узла
    callback(node);

    // выполнение коллбэка для левого потомка
    if (node.left) {
      traverseDFRecursive(node.left, callback);
    }

    // выполнение коллбэка для правого потомка
    if (node.right) {
      traverseDFRecursive(node.right, callback);
    }
  }
  traverseDFRecursive(root, callback);
}

export function traverseBF(root, callback) {
  // simple BFS for tree
  const nodeQueue = new Queue();
  nodeQueue.enqueue(root);

  while (!nodeQueue.isEmpty()) {
    const currentNode = nodeQueue.dequeue();

    // Вызываем коллбэк для самого узла
    callback(currentNode);

    // Добавляем в очередь левого потомка
    if (currentNode.left) {
      nodeQueue.enqueue(currentNode.left);
    }

    // Добавляем в очередь правого потомка
    if (currentNode.right) {
      nodeQueue.enqueue(currentNode.right);
    }
  }
}
