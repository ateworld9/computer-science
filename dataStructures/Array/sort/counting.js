/* eslint-disable operator-assignment */
/* eslint-disable no-shadow */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const arr = [9, 9, 9, 9, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1];
// O = n ,но подходит только для массивов с маленьким диапазоном значений и повторами
function countingSort(arr) {
	const map = {};
	arr.forEach((el) => {
		if (map[el] >= 0) {
			map[el] = map[el] + 1;
		} else {
			map[el] = 0;
		}
	});
	// arr.forEach((el) => { map[el] = (map[el] ?? 0) + 1 })
	console.log(map); // { '1': 4, '5': 4, '6': 6, '9': 3 }
	const res = [];
	for (const key in map) {
		let count = map[key];
		while (count > 0) {
			res.push(+key);
			count -= 1;
		}
	}
	return res;
}

console.log(countingSort(arr));
// [1, 1, 1, 1, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 9, 9, 9]
