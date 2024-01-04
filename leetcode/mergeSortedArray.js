function mergeSortedArraysInPlace(arr1, m, arr2, n) {
	let i = m - 1;
	let j = n - 1;
	let k = m + n - 1;

	while (j >= 0) {
		if (i >= 0 && arr1[i] > arr2[j]) {
			arr1[k--] = arr1[i--];
		} else {
			arr1[k--] = arr2[j--];
		}
	}
}

const arr1 = [1, 2, 3, 0, 0, 0];
const arr2 = [2, 5, 6];
mergeSortedArraysInPlace(arr1, 3, arr2, 3);
console.log(arr1);
