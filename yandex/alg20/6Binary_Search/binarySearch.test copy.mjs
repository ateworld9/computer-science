import assert from 'node:assert';
import test from 'node:test';
import { leftBinarySearch } from './binarySearch.mjs';

// assert.strictEqual();

test('left binary search test with empty array', async (t) => {
  const arr = [];

  assert.strictEqual(leftBinarySearch(arr, 5), -1);
});

test('left binary search test with 1 element array', async (t) => {
  const arr = [7];
  await t.test('found', () => {
    assert.strictEqual(leftBinarySearch(arr, 7), 0);
  });
  await t.test('not found', () => {
    assert.strictEqual(leftBinarySearch(arr, 5), -1);
  });
});

test('left binary search test with 2 element array', async (t) => {
  const arr = [4, 5];

  await t.test('to found first element', () => {
    assert.strictEqual(leftBinarySearch(arr, 4), 0);
  });
  await t.test('to found last element', () => {
    assert.strictEqual(leftBinarySearch(arr, 5), 1);
  });
  await t.test('not found', () => {
    assert.strictEqual(leftBinarySearch(arr, 6), -1);
  });
});

test('left binary search test with 3 element array', async (t) => {
  const arr = [4, 5, 8];

  await t.test('to found first element', () => {
    assert.strictEqual(leftBinarySearch(arr, 4), 0);
  });

  await t.test('to found', () => {
    assert.strictEqual(leftBinarySearch(arr, 5), 1);
  });

  await t.test('to found last element', () => {
    assert.strictEqual(leftBinarySearch(arr, 8), 2);
  });

  await t.test('not found', () => {
    assert.strictEqual(leftBinarySearch(arr, 6), -1);
  });
});

test('left binary search test with repeated target element array', async (t) => {
  const arr = [4, 5, 8, 8, 8, 8, 8, 8, 9];

  await t.test('to found first element', () => {
    assert.strictEqual(leftBinarySearch(arr, 4), 0);
  });

  await t.test('to found', () => {
    assert.strictEqual(leftBinarySearch(arr, 5), 1);
  });
  await t.test('to found repeated element', () => {
    assert.strictEqual(leftBinarySearch(arr, 8), 2);
  });

  await t.test('to found last element', () => {
    assert.strictEqual(leftBinarySearch(arr, 9), 8);
  });

  await t.test('not found', () => {
    assert.strictEqual(leftBinarySearch(arr, 6), -1);
  });
});
