function zFunc(str) {
  const zf = new Array(str.length).fill(0);
  let left = 0;
  let right = 0;
  for (let i = 1; i < str.length; i += 1) {
    zf[i] = Math.max(0, Math.min(right - i, zf[i - left]));

    while (i + zf[i] < str.length && str[zf[i]] === str[i + zf[i]]) {
      zf[i] += 1;
    }
    if (i + zf[i] > right) {
      left = i;
      right = i + zf[i];
    }
  }
  return zf;
}
