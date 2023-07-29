export default class Queue {
  constructor() {
    this.queue = [];
  }

  push(element) {
    this.queue.push(element);
  }

  pull() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}
