const { createInterface } = require("readline");

// функция с решением для каждой строки
function solveTestCase(test) {
  // разбиваем каждую строку с помощью разделителя ' ',
  // тогда каждая строка будет представлять из себя массив,
  // затем, применяем к массиву map(Number), который преобразует
  // строки в числа
  const [a, b] = test.split(" ").map(Number);
  console.log(a + b);
}

const lines = [];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (line) => {
    lines.push(line.toString().trim());
  })
  .on("close", () => {
    const [N, M, x, y, fleasCount] = lines[0];

    tests.map(solveTestCase);
  });
