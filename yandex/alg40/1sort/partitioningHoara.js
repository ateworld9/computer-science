function partitioningHoara(arr, x) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    if (arr[left] < x) {
      left += 1;
    }
    if (arr[right] > x) {
      right += 1;
    }

    if (arr[left] >= x && arr[right] < x) {
      swap(arr, left, right);
    }
  }
}
