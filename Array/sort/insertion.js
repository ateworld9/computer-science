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

console.log(arr)
insertionSort(arr)
console.log(arr)
