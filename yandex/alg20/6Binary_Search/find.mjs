// [L, R)
export function leftBinarySearch(l, r, check, checkparams) {
  while (l < r) {
    const m = Math.trunc((l + r) / 2);
    if (check(m, checkparams)) r = m;
    else l = m + 1;
  }
  return l;
}
// (L, R]
export function rightBinarySearch(l, r, check, checkparams) {
  while (l < r) {
    const m = Math.ceil((l + r) / 2);
    if (check(m, checkparams)) l = m;
    else r = m - 1;
  }
  return l;
}

export function floatBinarySearch(l, r, eps, check, checkparams) {
  while (l + eps < r) {
    const m = (l + r) / 2;
    if (check(m, checkparams)) r = m;
    else l = m;
  }
  return l;
}
