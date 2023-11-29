import { DoublyLinkedList } from ".";

const list = new DoublyLinkedList();
list.insertToTail(1);
list.insertToTail(2);
list.insertToTail(3);
list.insertToTail(4);
list.delete(2);
list.print();
// console.log(list.toArray(), list)
