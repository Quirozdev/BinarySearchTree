import Tree from './binarySearchTree.js';

const newTree = new Tree([9, 8, 7, 5, 6, 3, 1, 2, 4]);
newTree.prettyPrint(newTree.root);
// newTree.insert(10);
newTree.prettyPrint(newTree.root);
// newTree.insert(0);
newTree.prettyPrint(newTree.root);
// newTree.insert(-2);
newTree.prettyPrint(newTree.root);
// console.log(newTree.find(7));
// console.log(newTree.find(1234));
// newTree.insert(5);
newTree.prettyPrint(newTree.root);
// newTree.delete(-2);
newTree.prettyPrint(newTree.root);
// newTree.delete(1);
newTree.prettyPrint(newTree.root);
// newTree.delete(3);
newTree.prettyPrint(newTree.root);
newTree.delete(2);
newTree.prettyPrint(newTree.root);
newTree.delete(3);
newTree.prettyPrint(newTree.root);
newTree.delete(7);
newTree.prettyPrint(newTree.root);
newTree.delete(8);
newTree.prettyPrint(newTree.root);
newTree.delete(5);
newTree.prettyPrint(newTree.root);
newTree.delete(6);
newTree.prettyPrint(newTree.root);
newTree.delete(4);
newTree.prettyPrint(newTree.root);
newTree.delete(9);
newTree.prettyPrint(newTree.root);
console.log(newTree.root);
newTree.delete(1);
newTree.prettyPrint(newTree.root);
console.log(newTree.root);
