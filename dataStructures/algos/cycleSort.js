/* eslint-disable no-continue */
function cycleSort(data) {
  // Проходим по массиву в поиске цикла
  for (let cycleStart = 0; cycleStart <= data.length; cycleStart += 1) {
    const value = data[cycleStart];

    // Ищем, куда вставить элемент
    let pos = cycleStart;
    for (let i = cycleStart + 1; i < data.length; i += 1) {
      if (data[i] < value) {
        pos += 1;
      }
    }

    // Если элемент стоит на месте, то сразу
    // переходим к следующей итерации
    if (pos === cycleStart) {
      continue;
    }
  }
}
