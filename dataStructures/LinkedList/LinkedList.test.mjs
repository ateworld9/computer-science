import test from 'node:test';
import assert from 'node:assert';
import { LinkedList } from './class.mjs';
// const list = new LinkedList();

// list.insertToTail(2);
// list.insertToTail(6);
// list.insertToTail(19);
// list.insertToTail(20);
// list.print();
// console.log(list.hasLoop());
// list.tail.next = list.head.next;
// console.log(list.hasLoop());

// // list.reverse()
// // list.print()

test('LinkedList', async (t) => {
  await t.test('Symbol.iterator', () => {
    const list = new LinkedList();
    list.insertToTail(1);
    list.insertToTail(2);
    list.insertToTail(3);

    const result = [];
    for (const el of list) {
      console.log(el);
      result.push(el);
    }
    assert.deepStrictEqual(result, [1, 2, 3]);
  });

  await t.test('insertToHead method', () => {
    const list = new LinkedList();
    list.insertToHead(1);
    list.insertToHead(2);
    list.insertToHead(3);
    assert.deepStrictEqual(list.toArray(), [3, 2, 1]);
    assert.strictEqual(list.head.data, 3);
    assert.strictEqual(list.tail.data, 1);
    assert.strictEqual(list.length, 3);
  });
  await t.test('insertToTail method', () => {
    const list = new LinkedList();
    list.insertToTail(1);
    list.insertToTail(2);
    list.insertToTail(3);
    assert.deepStrictEqual(list.toArray(), [1, 2, 3]);
    assert.strictEqual(list.head.data, 1);
    assert.strictEqual(list.tail.data, 3);
    assert.strictEqual(list.length, 3);
  });
  await t.test('insert method', () => {
    const list = new LinkedList();
    list.insert(1, 0);
    list.insert(2, 1);
    list.insert(3, 2);
    assert.deepStrictEqual(list.toArray(), [1, 2, 3]);
    assert.strictEqual(list.head.data, 1);
    assert.strictEqual(list.tail.data, 3);
    assert.strictEqual(list.length, 3);
  });

  // await t.test("insert method throws on non-existent position", () => {
  //   const list = new LinkedList();
  //   expect(() => {
  //     list.insert(1, 1);
  //   }).toThrow("LinkedList: insert: Invalid position");
  //   list.insertToHead(1);
  //   expect(() => {
  //     list.insert(3, 10);
  //   }).toThrow("LinkedList: insert: Invalid position");
  // });
});
