// 'use strict'

const arraytoQueueAdapter = () => {
  const arr = [];
  arr.enqueue = (data) => arr.push(data);
  arr.dequeue = () => arr.pop();
  arr.count = () => arr.length;
  return arr;
};

// Usage

const queue = arraytoQueueAdapter();

queue.enqueue("one");
queue.enqueue("two");
queue.enqueue("three");

while (queue.count()) {
  console.log(queue.dequeue());
}
