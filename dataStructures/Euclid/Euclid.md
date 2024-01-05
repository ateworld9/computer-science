[Алгоритмы и Структуры данных](../DataStructures_and_Algorithms.md)

# Алгоритм евклида (Поиск наибольшего общего делителя)

Алгоритм:

1. Большее число делим на меньшее
2. Если делится без остатка, то меньшее число и есть НОД(следует выйти из цикла)
3. Если есть остаток, то большее число заменяем на остаток от деления.

```jsx
function gcd(a, b) {
	// recursive
	if (b === 0) {
		return a;
	} else {
		return gcd(b, a % b);
	}
}
console.log(gcd(30, 18)); // 6
console.log(gcd(18, 30)); // 6

function gcd2(a, b) {
	// cycle
	while (a !== 0 && b !== 0) {
		if (a > b) {
			a = a % b;
		} else {
			b = b % a;
		}
	}

	return a === 0 ? b : a;
}

console.log(gcd2(30, 18)); // 6
console.log(gcd2(18, 30)); // 6
```
