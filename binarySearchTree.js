import Node from './nodeClass.js';
import { mergeSort, removeDuplicates } from './utils.js';

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
    const leftMostNode = this.findLeftMostNode(node.rightChildren);
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

  findLeftMostNode(rootNode) {
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

  isNodeInTheTree(value) {
    return this.find(value) ? true : false;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
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
