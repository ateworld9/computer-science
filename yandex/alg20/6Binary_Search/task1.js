// В управляющий совет школы входят родители, учителя и учащиеся школы,
// причем родителей должно быть не менее одной трети от общего числа членов совета.
// В настоящий момент в совет входит N человек, из них K родителей

// Определите, сколько родителей нужно дополнительно ввести в совет,
// чтобы их число стало составлять не менее трети от числа членов совета

// (K + X) / (N + X) >= 1 / 3

function leftBinarySearch(l, r, check, checkparams) {
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (check(m, checkparams)) r = m;
    else l = m + 1;
  }
  return l;
}

function checkendownment(m, params) {
  let [n, k] = params;
  return (k + m) * 3 >= n + m;
}

console.log(leftBinarySearch(0, 1000, checkendownment, [10, 1]));
