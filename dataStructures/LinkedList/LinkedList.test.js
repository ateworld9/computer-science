import { LinkedList } from "./index.mjs";

test("LinkedList", (t) => {
  t.test("insertToHead method", () => {
    const list = new LinkedList();
    list.insertToHead(1);
    list.insertToHead(2);
    list.insertToHead(3);
    expect(list.toArray()).toEqual([3, 2, 1]);
    expect(list.head.data).toBe(3);
    expect(list.tail.data).toBe(1);
    expect(list.length).toBe(3);
  });
  t.test("insertToTail method", () => {
    const list = new LinkedList();
    list.insertToTail(1);
    list.insertToTail(2);
    list.insertToTail(3);
    expect(list.toArray()).toEqual([1, 2, 3]);
    expect(list.head.data).toBe(1);
    expect(list.tail.data).toBe(3);
    expect(list.length).toBe(3);
  });
  t.test("insert method", () => {
    const list = new LinkedList();
    list.insert(1, 0);
    list.insert(2, 1);
    list.insert(3, 2);
    expect(list.toArray()).toEqual([1, 2, 3]);
    expect(list.head.data).toBe(1);
    expect(list.tail.data).toBe(3);
    expect(list.length).toBe(3);
  });

  t.test("insert method throws on non-existent position", () => {
    const list = new LinkedList();
    expect(() => {
      list.insert(1, 1);
    }).toThrow("LinkedList: insert: Invalid position");
    list.insertToHead(1);
    expect(() => {
      list.insert(3, 10);
    }).toThrow("LinkedList: insert: Invalid position");
  });
});
