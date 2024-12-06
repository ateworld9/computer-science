import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Dollar } from './Dollar';

describe('Dollar module', () => {
	it('test equality', () => {
		assert.equal(new Dollar(5).equals(new Dollar(5)), true);
		assert.equal(new Dollar(5).equals(new Dollar(6)), false);
	});
	it('test multiplication', () => {
		const five: Dollar = new Dollar(5);
		assert.deepStrictEqual(five.times(2), new Dollar(10));
		assert.deepStrictEqual(five.times(3), new Dollar(15));
	});
});
