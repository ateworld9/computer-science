// Задана процентная ставка по кредиту(X% годовых),
// срок кредитования(N месяцев) и сумма кредита(M рублей)

// Необходимо рассчитать размер аннуитетного ежемесячного платежа
// Аннуитетный платеж -- каждый месяц одна сумма

function checkMonthlyPercent(mPercent, yPercent) {
  const mSum = 1 + mPercent / 100;
  const ySum = 1 + yPercent / 100;

  return mSum ** 12 >= ySum;
}

function floatBinarySearch(l, r, eps, check, checkparams) {
  while (l + eps < r) {
    const m = (l + r) / 2;
    if (check(m, checkparams)) r = m;
    else l = m;
  }
  return l;
}

const x = 12;
const eps = 0.01;

// Рассчитаем процент месяца, исходя из годовой ставки
const mperc = floatBinarySearch(0, x, eps, checkMonthlyPercent, x);
console.log(mperc);

// Рассчитаем месячный платеж
function checkCredit(mothlyPay, params) {
  let [periods, creditSum, monthlyPercent] = params;
  for (let i = 0; i <= periods; i += 1) {
    const percPay = creditSum * (monthlyPercent / 100);
    creditSum -= mothlyPay - percPay;
  }

  return creditSum <= 0;
}

const m = 10_000_000;
const n = 300;
const monthlyPay = floatBinarySearch(0, m, eps, checkCredit, [n, m, mperc]);
console.log(monthlyPay);
