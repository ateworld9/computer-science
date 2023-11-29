const arraytoQueueAdapter = (arr = []) => ({
  enqueue(data) {
    arr.push(data);
  },
  dequeue() {
    return arr.pop();
  },
  get count() {
    return arr.length;
  },
});

const queue = arraytoQueueAdapter([1, 2, 3]);
queue.enqueue('one');
queue.enqueue('two');
queue.enqueue('three');

while (queue.count) {
  console.log(queue.dequeue());
}
