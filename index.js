import Tree from './binarySearchTree.js';

const newTree = new Tree([9, 8, 7, 5, 6, 3, 1, 2, 4]);
newTree.prettyPrint(newTree.root);
newTree.insert(10);
newTree.prettyPrint(newTree.root);
newTree.insert(0);
newTree.prettyPrint(newTree.root);
newTree.insert(-2);
newTree.prettyPrint(newTree.root);
console.log(newTree.find(7));
