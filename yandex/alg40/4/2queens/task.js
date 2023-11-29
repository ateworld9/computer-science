/* eslint-disable no-param-reassign */
const readline = require('node:readline');

function isSafe(board, row, col) {
  for (let i = 0; i < row; i += 1) {
    // Проверяем только все что вверху
    if (
      board[i] === col || // Проверка по вертикали
      board[i] - i === col - row || // Проверка по диагонали вверх влево
      board[i] + i === col + row // Проверка по диагонали вверх вправо
    ) {
      return false;
    }
  }
  return true;
}

function countQueensArrangementsRecursion(board, row, N) {
  if (row === N) {
    return 1;
  }

  let count = 0;

  for (let col = 0; col < N; col += 1) {
    // вызываем рекурсию по 4 колонкам
    if (isSafe(board, row, col)) {
      // сужаем рекурсию сразу
      board[row] = col;
      count += countQueensArrangementsRecursion(board, row + 1, N);
      // Отменяем последнее размещение для backtracking
      board[row] = -1;
    }
  }

  return count;
}

function countQueensArrangements(N) {
  const board = new Array(N).fill(-1);
  return countQueensArrangementsRecursion(board, 0, N);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const result = countQueensArrangements(Number(line));
  console.log(result);
  process.exit(0);
});
