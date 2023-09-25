// 'use strict'

const fp = {}

fp.mapNull = (fn, x) => (x ? fn(x) : null)

fp.maybe = (x) => {
	const map = fn => fp.maybe(fp.mapNull(fn, x))
	// functor - with apply and chain is Monad
	map.ap = fnA => fnA(fn => fp.mapNull(fn, x))
	map.chain = fnM => fnM(x)
	return map
}

// Usage
fp.maybe(5)(x => x * 2)(x => x + 1)(console.log)
fp.maybe(5)(x => x * 2).ap(fp.maybe(x => x + 1))(console.log)
fp.maybe(5).chain(x => fp.maybe(x * 2))(x => x + 1)(console.log)

const config = {
	coords: {
		x: 1,
		y: 5,
	},
	velocity: {
		x: 1,
		y: 1,
	},
}

const addVelocity = velocity => coords => ({ x: coords.x + velocity.x, y: coords.y + velocity.y })

const coords = fp.maybe(config.coords)
const velocity = fp.maybe(config.velocity)

coords.ap(velocity(addVelocity))(console.log)
