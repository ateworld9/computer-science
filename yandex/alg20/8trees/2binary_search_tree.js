function createNode(data) {
  return { value: data, left: null, right: null };
}

function addNode() {}

function findBinaryTree(node, value) {
  if (node.value === value) {
    return node;
  }
  if (node.value < value) {
    return findBinaryTree(node.left, value);
  }
  if (node.value > value) {
    return findBinaryTree(node.right, value);
  }
}
