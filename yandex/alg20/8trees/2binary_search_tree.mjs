export function createNode(data) {
  return { parent: null, value: data, left: null, right: null };
}

export function find(tree, value) {
  if (tree === null || tree.value === value) {
    return tree;
  }
  if (tree.value > value) {
    return find(tree.left, value);
  } else {
    return find(tree.right, value);
  }
}

export function findMin(tree) {
  if (tree.left === null) {
    return tree;
  }
  return findMin(tree.left);
}
export function findMax(tree) {
  if (tree.right === null) {
    return tree;
  }
  return findMax(tree.right);
}

export function findNext(node) {
  if (node.right !== null) {
    return findMin(node.right);
  }
  let root = node.parent;
  let nearestRight = node;
  while (root !== null && nearestRight === root.right) {
    nearestRight = root;
    root = root.parent;
  }
  return root;
}

export function findPrev(node) {
  if (node.left !== null) {
    return findMax(node.left);
  }
  let root = node.parent;
  let nearestLeft = node;
  while (root !== null && nearestLeft === root.left) {
    nearestLeft = root;
    root = root.parent;
  }
  return root;
}

export function addNode(tree, value) {
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
}

export function deleteNode(tree, value) {
  const nodeToDelete = find(tree, value);

  if (nodeToDelete === null) {
    return null;
  }
  // first case: nodeToDelete is a leaf
  if (nodeToDelete.left === null && nodeToDelete.right === null) {
    if (nodeToDelete.parent.left === nodeToDelete) {
      nodeToDelete.parent.left = null;
    }
    if (nodeToDelete === nodeToDelete.parent.right) {
      nodeToDelete.parent.right = null;
    }
  }

  // second case: nodeToDelete have one child
  else if (nodeToDelete.left === null || nodeToDelete.right === null) {
    if (nodeToDelete.left === null) {
      if (nodeToDelete.parent.left === nodeToDelete) {
        nodeToDelete.parent.left = nodeToDelete.right;
      } else {
        nodeToDelete.parent.right = nodeToDelete.right;
      }
    } else {
      if (nodeToDelete.parent.left === nodeToDelete) {
        nodeToDelete.parent.left = nodeToDelete.left;
      } else {
        nodeToDelete.parent.right = nodeToDelete.left;
      }
    }
  } // third case: nodeToDelete have two children
  else {
    const next = findNext(nodeToDelete);
    nodeToDelete.value = next.value;

    if (next.parent.left === next) {
      next.parent.left = next.right;
      if (next.right !== null) {
        next.right.parent = next.parent;
      }
    } else {
      next.parent.right = next.right;
      if (next.right !== null) {
        next.right.parent = next.parent;
      }
    }
  }
}

export function inorderTraversal(node, callback) {
  if (node !== null) {
    inorderTraversal(node.left, callback);
    callback(node);
    inorderTraversal(node.right, callback);
  }
}
export function preorderTraversal(node, callback) {
  const queue = [];
  queue.push(node);

  while (queue.length > 0) {
    const currentNode = queue.shift();

    callback(currentNode);

    if (currentNode.left !== null) {
      queue.push(currentNode.left);
    }

    if (currentNode.right !== null) {
      queue.push(currentNode.right);
    }
  }
}
export function postorderTraversal(node, callback) {
  if (node !== null) {
    postorderTraversal(node.left, callback);
    postorderTraversal(node.right, callback);
    callback(node);
  }
}
