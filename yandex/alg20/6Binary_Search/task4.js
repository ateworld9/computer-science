// Задана отсортированная по неубыванию последовательность из N чисел и число X.
// Необходимо определить индекс первого числа в последовательности, которое больше либо равно X.
// Если такого числа нет, то вернуть Null

function leftBinarySearch(l, r, check, params) {
  while (l < r) {
    const m = Math.trunc((l + r) / 2);
    if (check(m, params)) {
      r = m;
    } else {
      l = m + 1;
    }
  }
  return l;
}

function checkNum(index, params) {
  const [seq, x] = params;
  return seq[index] >= x;
}

const sequence = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10];

function starter(sequence, x) {
  const ans = leftBinarySearch(0, sequence.length - 1, checkNum, [sequence, x]);
  if (sequence[ans] < x) {
    return null;
  }
  return ans;
}

console.log(starter(sequence, 5));
console.log(starter(sequence, 25));
