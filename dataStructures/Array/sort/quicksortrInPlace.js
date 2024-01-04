const arr = [
	406, 157, 415, 318, 472, 46, 252, 187, 364, 481, 450, 90, 390, 35, 452, 74,
	196, 312, 142, 160, 143, 220, 483, 392, 443, 488, 79, 234, 68, 150, 356, 496,
	69, 88, 177, 12, 288, 120, 222, 270, 441, 422, 103, 321, 65, 316, 448, 331,
	117, 183, 184, 128, 323, 141, 467, 31, 172, 48, 95, 359, 239, 209, 398, 99,
	440, 171, 86, 233, 293, 162, 121, 61, 317, 52, 54, 273, 30, 226, 421, 64, 204,
	444, 418, 275, 263, 108, 10, 149, 497, 20, 97, 136, 139, 200, 266, 238, 493,
	22, 17, 39,
];

// O = n * log n
// low memory

function swap(arr, i, j) {
	const toSwap = arr[i];
	arr[i] = arr[j];
	arr[j] = toSwap;
}

function LomutoPartitioning(arr, low, high) {
	// разбиение на меньшие и большие
	const pivot = +arr[high];

	let i = low - 1;
	let j = low;

	while (j <= high - 1) {
		if (+arr[j] <= pivot) {
			i++;
			swap(arr, i, j);
		}
		j++;
	}

	i++;
	swap(arr, i, j);
	return i;
}

function quicksort(arr, low = 0, high = arr.length - 1) {
	if (low >= high || low < 0) {
		return;
	}

	const p = LomutoPartitioning(arr, low, high);

	quicksort(arr, low, p - 1);
	quicksort(arr, p + 1, high);
}

console.log(arr);

quicksort(arr);

console.log(arr);
