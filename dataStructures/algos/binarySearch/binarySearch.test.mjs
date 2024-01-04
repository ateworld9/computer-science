import assert from 'node:assert';
import test from 'node:test';
import { binarySearch } from './index.mjs';

// assert.strictEqual();

test('binary search test with empty array', async (t) => {
	const arr0 = [];

	assert.strictEqual(binarySearch(arr0, 5), -1);
});

test('binary search test with 1 element array', async (t) => {
	const arr1 = [7];
	await t.test('found', () => {
		assert.strictEqual(binarySearch(arr1, 7), 0);
	});
	await t.test('not found', () => {
		assert.strictEqual(binarySearch(arr1, 5), -1);
	});
});

test('binary search test with 2 element array', async (t) => {
	const arr2 = [4, 5];

	await t.test('to found first element', () => {
		assert.strictEqual(binarySearch(arr2, 4), 0);
	});
	await t.test('to found last element', () => {
		assert.strictEqual(binarySearch(arr2, 5), 1);
	});
	await t.test('not found', () => {
		assert.strictEqual(binarySearch(arr2, 6), -1);
	});
});

test('binary search test with 3 element array', async (t) => {
	const arr3 = [4, 5, 8];

	await t.test('to found first element', () => {
		assert.strictEqual(binarySearch(arr3, 4), 0);
	});

	await t.test('to found', () => {
		assert.strictEqual(binarySearch(arr3, 5), 1);
	});

	await t.test('to found last element', () => {
		assert.strictEqual(binarySearch(arr3, 8), 2);
	});

	await t.test('not found', () => {
		assert.strictEqual(binarySearch(arr3, 6), -1);
	});
});

// const arr4 = [4, 5, 8, 8, 8, 8, 8, 8, 9];

// console.log(binarySearch(arr4, 8));

// console.assert(binarySearch(arr4, 8) === 4, 'test10 is not passed');
