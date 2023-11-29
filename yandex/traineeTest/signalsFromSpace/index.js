const signals = [
  {
    time: 0,
    value: 'yandex',
  },
  {
    time: 8,
    value: 'adventure',
  },
  {
    time: 3,
    value: '010',
  },
  {
    time: 9,
    value: '01111',
  },
];

function parseSignals(arr) {
  let result = '';
  let string = '';
  for (let j = 0; j < arr.length; j++) {
    if (isNaN(Number(arr[j].value))) {
      for (let i = string.length; i <= arr[j].time; i++) {
        string += '_';
      }
      string += arr[j].value;
    } else {
      for (let i = 0; i < arr[j].value.length; i++) {
        if (arr[j].value[i] === '1') {
          result += string[arr[j].time + i + 1];
        }
      }
    }
  }
  return result;
}

const response = parseSignals(signals);

console.log([response]);
// y a n d e x _ _ a d v e n t u r e
// _ _ _ 0 1 0 _ _ _ 0 1 1 1 1 _ _ _
