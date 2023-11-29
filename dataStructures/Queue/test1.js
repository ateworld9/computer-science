import { Queue } from '.';

const queue = new Queue();

queue.enqueue(1);
queue.print();
queue.enqueue(2);
queue.print();
queue.enqueue(3);
queue.print();
queue.enqueue(4);
queue.print();
queue.dequeue();
queue.print();
