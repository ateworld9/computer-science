const arr = [
  193, 710, -326, -212, 630, 434, -378, 728, 25, 702, -324, 719, -546, -754,
  -256, -254, 268, -718, -145, -28, 12, 125, 7, -565, 54, 594, 301, -267, 776,
  532, 141, -555, -453, 663, -556, -607, 58, 734, 584, -632, 202, -304, 460,
  -405, 17, -97, 399, -551, 273, 400, 298, 699, -472, 275, 16, -741, 623, -78,
  768, -421, 271, -264, 223, -288, 239, -502, 518, -337, -450, 539, 327, 77,
  285, 73, 784, 778, -196, -707, -174, 654, 190, 683, 375, 744, 40, 749, 133,
]
// O = n * log n
// many memory
function quicksort(arr) {
  if (arr.length < 1)
    return []

  const pivot = arr[0]
  const left = []
  const right = []
  for (let i = 1; i < arr.length; i += 1) {
    if (+arr[i] > +pivot)
      right.push(arr[i])

    else
      left.push(arr[i])
  }
  const res = [...quicksort(left), pivot, ...quicksort(right)]

  return res
}

console.log(arr)

console.log(quicksort(arr))
