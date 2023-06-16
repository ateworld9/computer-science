function reverseArray(arr) {
  const newArr = []
  for (let i = 0; i < arr.length; i += 1)
    newArr[i] = arr[arr.length - 1 - i]

  return newArr
}

console.log(reverseArray([1, 4, 3, 2]))
