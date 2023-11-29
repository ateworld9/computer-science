function gcd(a, b) {
  // recursive
  if (b === 0) {
    return a;
  } else {
    return gcd(b, a % b);
  }
}
console.log(gcd(30, 18));
console.log(gcd(18, 30));

function gcd2(a, b) {
  while (a !== 0 && b !== 0) {
    if (a > b) {
      a = a % b;
    } else {
      b = b % a;
    }
  }

  return a === 0 ? b : a;
}

console.log(gcd2(30, 18));
console.log(gcd2(18, 30));
