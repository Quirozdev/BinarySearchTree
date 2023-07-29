import Tree from './binarySearchTree.js';
import { createArrayWithRandomNumbers } from './utils.js';

/*
  1. Create a binary search tree from an array of random
    numbers < 100. You can create a function that returns
    an array of random numbers every time you call it, if
    you wish.
*/
const tree = new Tree(createArrayWithRandomNumbers(20, 0, 100));
tree.prettyPrint();

/*
  2. Confirm that the tree is balanced by calling isBalanced.
*/
console.log(tree.isBalanced());

/*
  3. Print out all elements in level, pre, post, and in order.
*/

printInAllOrders();

/*
  4. Unbalance the tree by adding several numbers > 100.
*/

const numbers = createArrayWithRandomNumbers(20, 100, 300);
numbers.forEach((number) => {
  tree.insert(number);
});
tree.prettyPrint();

/*
  5. Confirm that the tree is unbalanced by calling isBalanced.
*/
console.log(tree.isBalanced());

/*
  6. Balance the tree by calling rebalance.
*/

tree.rebalance();
tree.prettyPrint();

/*
  7. Confirm that the tree is balanced by calling isBalanced.
*/
console.log(tree.isBalanced());

/*
  8. Print out all elements in level, pre, post, and in order.
*/

printInAllOrders();

function printInAllOrders() {
  console.log('Level order traversal');
  let inLevelOrderNodeValues = '';
  tree.levelOrder((node) => {
    inLevelOrderNodeValues += node.value + ' ';
  });
  console.log(inLevelOrderNodeValues);

  console.log('Preorder traversal');
  let preOrderNodeValues = '';
  tree.preOrder((node) => {
    preOrderNodeValues += node.value + ' ';
  });
  console.log(preOrderNodeValues);

  console.log('Postorder traversal');
  let postOrderNodeValues = '';
  tree.postOrder((node) => {
    postOrderNodeValues += node.value + ' ';
  });
  console.log(postOrderNodeValues);

  console.log('In order traversal');
  let inOrderNodeValues = '';
  tree.inOrder((node) => {
    inOrderNodeValues += node.value + ' ';
  });
  console.log(inOrderNodeValues);
}
