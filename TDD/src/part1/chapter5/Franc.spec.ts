import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

describe('Franc module', () => {
	it('test equality', () => {
		assert.equal(new Franc(5).equals(new Franc(5)), true);
		assert.equal(new Franc(5).equals(new Franc(6)), false);
	});
	it('test multiplication', () => {
		const five: Franc = new Franc(5);
		assert.deepStrictEqual(five.times(2), new Franc(10));
		assert.deepStrictEqual(five.times(3), new Franc(15));
	});
});
