import test from 'node:test';
import assert from 'node:assert';
import { createHeap, maxComparator, popHeap, pushHeap } from './functional.mjs';

const buildMinHeap = () => {
	const heap = createHeap();
	pushHeap(heap, 2);
	pushHeap(heap, 5);
	pushHeap(heap, 4);
	pushHeap(heap, 11);
	pushHeap(heap, 6);
	pushHeap(heap, 8);
	pushHeap(heap, 25);
	pushHeap(heap, 12);
	pushHeap(heap, 20);

	return heap;
};

const buildMaxHeap = () => {
	const heap = createHeap();
	pushHeap(heap, 100, maxComparator);
	pushHeap(heap, 19, maxComparator);
	pushHeap(heap, 36, maxComparator);
	pushHeap(heap, 17, maxComparator);
	pushHeap(heap, 3, maxComparator);
	pushHeap(heap, 25, maxComparator);
	pushHeap(heap, 1, maxComparator);
	pushHeap(heap, 2, maxComparator);
	pushHeap(heap, 7, maxComparator);

	return heap;
};

test('BinaryHeap functional', async (t) => {
	await t.test('to build min Heap', (t) => {
		const heap = buildMinHeap();
		assert.deepEqual(heap, [2, 5, 4, 11, 6, 8, 25, 12, 20]);
	});

	await t.test('to build max Heap', (t) => {
		const heap = buildMaxHeap();
		assert.deepEqual(heap, [100, 19, 36, 17, 3, 25, 1, 2, 7]);
	});

	await t.test('to Push into min Heap', (t) => {
		const heap = buildMinHeap();
		pushHeap(heap, 3);
		assert.deepEqual(heap, [2, 3, 4, 11, 5, 8, 25, 12, 20, 6]);
	});

	await t.test('to Push into max Heap', (t) => {
		const heap = buildMaxHeap();
		pushHeap(heap, 99, maxComparator);
		assert.deepEqual(heap, [100, 99, 36, 17, 19, 25, 1, 2, 7, 3]);
	});

	await t.test('to Pop from min Heap', (t) => {
		const heap = buildMinHeap();
		const el = popHeap(heap);
		assert.strictEqual(el, 2);
		assert.deepEqual(heap, [4, 5, 8, 11, 6, 20, 25, 12]);
	});

	await t.test('to Push into max Heap', (t) => {
		const heap = buildMaxHeap();
		popHeap(heap, maxComparator);
		assert.deepEqual(heap, [36, 19, 25, 17, 3, 7, 1, 2]);
	});

	// await t.test('', (t) => {});
});
