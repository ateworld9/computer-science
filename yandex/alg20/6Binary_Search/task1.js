function leftBinarySearch(l, r, check, checkparams) {
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (check(m, checkparams)) r = m;
    else l = m + 1;
  }
  return l;
}
