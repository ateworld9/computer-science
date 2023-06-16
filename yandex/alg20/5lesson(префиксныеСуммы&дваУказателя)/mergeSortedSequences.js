const arr1 = [1, 3, 5, 7]
const arr2 = [3, 4, 4]

function mergeSortedSequences(seq1, seq2) {
  const result = new Array(seq1.length + seq2.length)
  // const result = []
  let i = 0
  let j = 0

  for (let k = 0; k < result.length; k += 1) {
    if ((i !== seq1.length && j === seq2.length) || seq1[i] <= seq2[j]) {
      result[k] = seq1[i]
      i += 1
    }
    else {
      result[k] = seq2[j]
      j += 1
    }
  }

  return result
}

console.log(mergeSortedSequences(arr1, arr2).join(' '))
