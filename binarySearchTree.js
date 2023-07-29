import Node from './nodeClass.js';
import { mergeSort, removeDuplicates } from './utils.js';
import Queue from './queue.js';

export default class Tree {
  constructor(arr) {
    const cleanArr = removeDuplicates(arr);
    const sortedArr = mergeSort(cleanArr);
    this.root = this.buildTree(sortedArr, 0, sortedArr.length - 1);
  }

  buildTree(arr, startIndex, endIndex) {
    if (startIndex > endIndex) return null;
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    const rootNode = new Node(arr[midIndex]);

    rootNode.leftChildren = this.buildTree(arr, startIndex, midIndex - 1);
    rootNode.rightChildren = this.buildTree(arr, midIndex + 1, endIndex);

    return rootNode;
  }

  insert(value) {
    if (this.isNodeInTheTree(value)) {
      console.error('That value is already in the tree');
      return;
    }
    this.insertRecursively(value);
  }

  insertRecursively(value, rootNode = this.root) {
    if (rootNode === null) {
      return new Node(value);
    }

    if (value < rootNode.value) {
      rootNode.leftChildren = this.insertRecursively(
        value,
        rootNode.leftChildren
      );
    } else {
      rootNode.rightChildren = this.insertRecursively(
        value,
        rootNode.rightChildren
      );
    }
    return rootNode;
  }

  delete(value) {
    const node = this.find(value);
    if (!node) {
      console.error('Node not present in the Tree');
      return;
    }

    // First case: The node is leaf
    if (node.isLeaf()) {
      const rootNodeOfNodeToDelete = this.findRootFromNode(node);
      // if the root is being deleted and is a leaf
      if (rootNodeOfNodeToDelete === null) {
        this.root = null;
        return;
      }
      if (rootNodeOfNodeToDelete.value > node.value) {
        rootNodeOfNodeToDelete.leftChildren = null;
      } else {
        rootNodeOfNodeToDelete.rightChildren = null;
      }
      return;
    }

    // Second case: The node has only 1 child
    if (!node.hasTwoChilds()) {
      const rootNodeOfNodeToDelete = this.findRootFromNode(node);
      // if the root is being deleted and has only one child
      if (rootNodeOfNodeToDelete === null) {
        this.root = node.leftChildren || node.rightChildren;
        return;
      }
      // for other nodes (not the root)
      if (node.leftChildren) {
        rootNodeOfNodeToDelete.leftChildren = node.leftChildren;
      } else {
        rootNodeOfNodeToDelete.rightChildren = node.rightChildren;
      }
      return;
    }

    // Third case: The node has two childs
    const rootNodeOfNodeToDelete = this.findRootFromNode(node);
    const leftMostNode = this.findInOrderSuccesor(node.rightChildren);
    const rootNodeOfNodeToReplace = this.findRootFromNode(leftMostNode);

    // if the root is being deleted and has two childs
    if (rootNodeOfNodeToDelete === null) {
      if (node !== rootNodeOfNodeToReplace) {
        rootNodeOfNodeToReplace.leftChildren = null;
      } else {
        rootNodeOfNodeToReplace.rightChildren = null;
      }
    } else {
      node.rightChildren = leftMostNode.rightChildren;
    }

    // change the node value to its inorder predecessor
    node.value = leftMostNode.value;
  }

  findInOrderSuccesor(rootNode) {
    let currentNode = rootNode;
    while (currentNode !== null) {
      if (currentNode.leftChildren === null) {
        return currentNode;
      }
      currentNode = currentNode.leftChildren;
    }
  }

  find(value, rootNode = this.root) {
    if (rootNode === null) {
      return null;
    }

    if (value === rootNode.value) {
      return rootNode;
    }

    if (value < rootNode.value) {
      return this.find(value, rootNode.leftChildren);
    } else {
      return this.find(value, rootNode.rightChildren);
    }
  }

  levelOrder(func) {
    const queue = new Queue();
    const arr = [];
    queue.push(this.root);
    while (!queue.isEmpty()) {
      const currentNode = queue.pull();
      if (!func) {
        arr.push(currentNode);
      } else {
        func(currentNode);
      }
      const [leftChildren, rightChildren] = currentNode.getAllChildren();
      if (leftChildren) queue.push(leftChildren);
      if (rightChildren) queue.push(rightChildren);
    }
    return arr;
  }

  inOrder(func, currentNode = this.root) {
    if (currentNode === null) {
      return [];
    }

    const leftSideArr = this.inOrder(func, currentNode.leftChildren);
    if (!func) {
      leftSideArr.push(currentNode);
    } else {
      func(currentNode);
    }

    const rightSideArr = this.inOrder(func, currentNode.rightChildren);
    return leftSideArr.concat(rightSideArr);
  }

  preOrder(func, currentNode = this.root) {
    if (currentNode === null) {
      return [];
    }
    const arr = [];

    if (!func) {
      arr.push(currentNode);
    } else {
      func(currentNode);
    }

    const leftSideArr = this.preOrder(func, currentNode.leftChildren);

    const rightSideArr = this.preOrder(func, currentNode.rightChildren);
    return arr.concat(leftSideArr, rightSideArr);
  }

  postOrder(func, currentNode = this.root) {
    if (currentNode === null) {
      return [];
    }

    const leftSideArr = this.postOrder(func, currentNode.leftChildren);

    const rightSideArr = this.postOrder(func, currentNode.rightChildren);

    if (!func) {
      rightSideArr.push(currentNode);
    } else {
      func(currentNode);
    }

    return leftSideArr.concat(rightSideArr);
  }

  isNodeRootOfAnotherNode(rootNode, childNode) {
    return (
      rootNode.leftChildren === childNode ||
      rootNode.rightChildren === childNode
    );
  }

  findRootFromNode(node) {
    if (node === this.root) {
      return null;
    }
    let currentNode = this.root;
    while (currentNode !== null) {
      if (this.isNodeRootOfAnotherNode(currentNode, node)) {
        return currentNode;
      }

      if (node.value < currentNode.value) {
        currentNode = currentNode.leftChildren;
      } else {
        currentNode = currentNode.rightChildren;
      }
    }
  }

  height(node) {
    if (node === null) {
      return 0;
    }

    if (node.isLeaf()) {
      return 0;
    }

    const leftSubTreeHeight = this.height(node.leftChildren) + 1;
    const rightSubTreeHeight = this.height(node.rightChildren) + 1;

    return Math.max(leftSubTreeHeight, rightSubTreeHeight);
  }

  depth(node, rootNode = this.root) {
    if (node === null) {
      return -1;
    }
    if (rootNode.value === node.value) {
      return 0;
    }

    const [leftChildren, rightChildren] = rootNode.getAllChildren();
    if (leftChildren) {
      const leftDepth = this.depth(node, rootNode.leftChildren) + 1;
      if (leftDepth) return leftDepth;
    }
    if (rightChildren) {
      const rightDepth = this.depth(node, rootNode.rightChildren) + 1;
      if (rightDepth) return rightDepth;
    }
  }

  isBalanced() {
    let balanced = true;
    this.levelOrder((currentNode) => {
      const leftSubTreeHeight = this.height(currentNode.leftChildren);
      const rightSubTreeHeight = this.height(currentNode.rightChildren);
      if (Math.abs(leftSubTreeHeight - rightSubTreeHeight) > 1) {
        balanced = false;
      }
    });
    return balanced;
  }

  rebalance() {
    const newSortedArr = this.inOrder().map((node) => node.value);
    this.root = this.buildTree(newSortedArr, 0, newSortedArr.length - 1);
  }

  isNodeInTheTree(value) {
    return this.find(value) ? true : false;
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.rightChildren !== null) {
      this.prettyPrint(
        node.rightChildren,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.leftChildren !== null) {
      this.prettyPrint(
        node.leftChildren,
        `${prefix}${isLeft ? '    ' : '│   '}`,
        true
      );
    }
  }
}
