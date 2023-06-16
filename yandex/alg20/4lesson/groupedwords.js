const wordsArr = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']

function groupedwords(words) {
  const groups = {}
  words.forEach((word) => {
    const sorted = Array.from(word).sort().join('')
    if (groups[sorted])
      groups[sorted].push(word)
    else
      groups[sorted] = [word]
  })
  const result = []
  for (const sorted in groups)
    result.push(groups[sorted])

  return result
}

console.log(groupedwords(wordsArr))
