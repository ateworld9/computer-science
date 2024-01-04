import test from 'node:test';
import assert from 'node:assert';
import { Stack } from './LinkedListStack.mjs';

test('Stack', async (t) => {
	await test('push/pop', () => {
		const stack = new Stack();

		stack.push(1);
		stack.push(2);
		stack.push(3);

		assert.strictEqual(stack.pop(), 3);
		assert.strictEqual(stack.pop(), 2);
		assert.strictEqual(stack.pop(), 1);
	});
	// test('', () => {});
	// test('', () => {});
});
