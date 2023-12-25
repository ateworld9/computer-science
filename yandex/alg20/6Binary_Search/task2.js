// Юра решил подготовится к собеседованию в Yandex.
// Он выбрал на сайте leetcode N задач.
// В первый день Юра решил K задач,
// а в каждый следующий день Юра решал на одну задачу больше, чем в предыдуший день

// Определите сколько дней у Юры уйдет на подготовку к собеседованию

function leftBinarySearch(l, r, check, checkparams) {
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (check(m, checkparams)) r = m;
    else l = m + 1;
  }
  return l;
}

function checkProblemCount(days, params) {
  const [n, k] = params;
  return Math.floor(((k + (k + days - 1)) * days) / 2) >= n;
}

console.log(leftBinarySearch(0, 1000, checkProblemCount, [100, 1]));
