export default class Node {
  constructor(value) {
    this.value = value;
    this.leftChildren = null;
    this.rightChildren = null;
  }

  isLeaf() {
    return this.leftChildren === null && this.rightChildren === null;
  }

  hasTwoChilds() {
    return this.leftChildren !== null && this.rightChildren !== null;
  }

  getAllChildren() {
    return [this.leftChildren, this.rightChildren];
  }
}
