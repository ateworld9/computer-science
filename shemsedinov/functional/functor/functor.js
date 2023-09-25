// function maybe(x) {
// 	return function (fn) {
// 		if (x && fn) {
// 			return fn(x)
// 		} else {
// 			return null
// 		}
// 	}
// }

const maybe = x => fn => maybe(x && fn ? fn(x) : null)

// Usage

console.log(maybe(5)())
maybe(5)(console.log)
maybe(5)()(console.log)
maybe(5)(x => x + 1)(console.log)
maybe(5)(x => x * 2)(console.log)
maybe(5)(x => x * 2)(x => x + 1)(console.log)
