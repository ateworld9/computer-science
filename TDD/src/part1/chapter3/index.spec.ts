import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Dollar } from './Dollar';

describe('3Dollar module', { skip: true }, () => {
	it('test equality', () => {
		assert.equal(new Dollar(5).equals(new Dollar(5)), true);
		assert.equal(new Dollar(5).equals(new Dollar(6)), false);
	});
	it('test multiply idempotent', () => {
		const five: Dollar = new Dollar(5);
		let product: Dollar = five.times(2);
		assert.equal(10, product.amount);
		product = five.times(3);
		assert.equal(15, product.amount);
	});
});
