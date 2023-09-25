/* eslint-disable no-param-reassign */
// O = n^2

function insertionSort(arr) {
	for (let i = 1; i < arr.length; i += 1) {
		const value = arr[i]
		let j = i - 1
		while (j >= 0 && arr[j] > value) {
			arr[j + 1] = arr[j]
			j -= 1
		}
		arr[j + 1] = value
	}
	return arr
}

const arr = [8, 7, 6, 5, 4, 3, 2, 1]
insertionSort(arr)
console.log(arr) // [ 1, 2, 3, 4, 5, 6, 7, 8 ]
