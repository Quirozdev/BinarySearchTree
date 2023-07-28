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

  insert(value, rootNode = this.root) {
    if (rootNode === null) {
      return new Node(value);
    }

    if (value < rootNode.value) {
      rootNode.leftChildren = this.insert(value, rootNode.leftChildren);
    } else {
      rootNode.rightChildren = this.insert(value, rootNode.rightChildren);
    }
    return rootNode;
  }

  delete(value) {}

  find(value, rootNode = this.root) {
    if (rootNode === null) {
      return null;
    }

    let nodeToFind;

    if (value === rootNode.value) {
      return rootNode;
    }

    if (value < rootNode.value) {
      nodeToFind = this.find(value, rootNode.leftChildren);
    } else {
      nodeToFind = this.find(value, rootNode.rightChildren);
    }

    return nodeToFind;
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
