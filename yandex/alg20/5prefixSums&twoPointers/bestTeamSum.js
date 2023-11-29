// https://www.youtube.com/live/de28y8Dcvkg?feature=share&t=2217
// Игрок в футбол обладает числовой характеристикой - профессионализмом.
// Команда называется сплоченной, если профессионализм любого игрока не превосходит суммарный профессионализм любых двух других игроков из команды.
// Команда может состоять из любого количества игроков
// Дано: отсортированная последовательность чисел длиной N - профессионализм игроков.
// Найти - максимальный суммарный профессионализм сплоченной команды
function bestTeamSum(players) {
  let bestSum = 0;
  let nowSum = 0;
  let last = 0;

  for (const first in players) {
    while (
      last < players.length &&
      (last === first || players[first] + players[first + 1] >= players[last])
    ) {
      nowSum += players[last];
      last += 1;
    }
    if (nowSum > bestSum) bestSum = nowSum;
    nowSum -= players[first];
  }
}
