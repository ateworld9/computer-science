/* eslint-disable max-classes-per-file */
import assert from 'assert/strict';
import { BinaryTreeNode, traverseBF } from '../BinaryTree/BinaryTree.mjs';

class BinarySearchTreeNode extends BinaryTreeNode {
  constructor(value, comparator) {
    super(value);
    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;

    this.comparator = comparator;
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

  insert(value) {
    if (this.comparator(value, this.value) < 0) {
      if (this.left) return this.left.insert(value);
      const newNode = new BinarySearchTreeNode(value, this.comparator);
      this.setLeft(newNode);

      return newNode;
    }

    if (this.comparator(value, this.value) > 0) {
      if (this.right) return this.right.insert(value);
      const newNode = new BinarySearchTreeNode(value, this.comparator);
      this.setRight(newNode);

      return newNode;
    }
    return this;
  }

  find(value) {
    if (this.comparator(this.value, value) === 0) return this;

    if (this.comparator(this.value, value) < 0 && this.left) {
      return this.left.find(value);
    }

    if (this.comparator(this.value, value) > 0 && this.right) {
      return this.right.find(value);
    }

    return null;
  }

  findMin() {
    if (!this.left) {
      return this;
    }

    return this.left.findMin();
  }

  removeChild(nodeToRemove) {
    if (this.left && this.left === nodeToRemove) {
      this.left = null;
      return true;
    }

    if (this.right && this.right === nodeToRemove) {
      this.right = null;
      return true;
    }

    return false;
  }

  replaceChild(nodeToReplace, replacementNode) {
    if (!nodeToReplace || !replacementNode) {
      return false;
    }

    if (this.left && this.left === nodeToReplace) {
      this.left = replacementNode;
      return true;
    }

    if (this.right && this.right === nodeToReplace) {
      this.right = replacementNode;
      return true;
    }

    return false;
  }
}

export class BinarySearchTree {
  constructor(value, comparator) {
    this.root = new BinarySearchTreeNode(value, comparator);
    this.comparator = comparator;
  }

  find(value) {
    return this.root.find(value);
  }

  insert(value) {
    if (!this.root.value) this.root.value = value;
    else this.root.insert(value);
  }

  remove(value) {
    const nodeToRemove = this.find(value);

    if (!nodeToRemove) {
      throw new Error('Item not found');
    }

    const { parent } = nodeToRemove;

    if (!nodeToRemove.left && !nodeToRemove.right) {
      // Нет потомков, листовой узел
      if (parent) {
        // Удалить у родителя указатель на удаленного потомка
        parent.removeChild(nodeToRemove);
      } else {
        // Нет родителя, корневой узел
        nodeToRemove.value = undefined;
      }
    } else if (nodeToRemove.left && nodeToRemove.right) {
      // Есть и левый, и правый потомки
      // Ищем минимальное значение в правом поддереве
      // И ставим его на место удаляемого узла
      const nextBiggerNode = nodeToRemove.right.findMin();

      if (this.comparator(nextBiggerNode, nodeToRemove.right) === 0) {
        // Правый потомок одновременно является минимальным в правом дереве
        // то есть у него нет левого поддерева
        // можно просто заменить удаляемый узел на его правого потомка
        nodeToRemove.value = nodeToRemove.right.value;
        nodeToRemove.setRight(nodeToRemove.right.right);
      } else {
        // Удалить найденный узел (рекурсия)
        this.remove(nextBiggerNode.value);
        // Обновить значение удаляемого узла
        nodeToRemove.value = nextBiggerNode.value;
      }
    } else {
      // Есть только один потомок (левый или правый)
      // Заменить удаляемый узел на его потомка
      const childNode = nodeToRemove.left || nodeToRemove.right;

      if (parent) {
        parent.replaceChild(nodeToRemove, childNode);
      } else {
        this.root = childNode;
      }
    }

    // Удалить ссылку на родителя
    nodeToRemove.parent = null;

    return true;
  }
}

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
  result.push(x.value);
});

assert.deepEqual(result, [8, 3, 10, 1, 6, 14, 4, 7, 13], 'not eq');
