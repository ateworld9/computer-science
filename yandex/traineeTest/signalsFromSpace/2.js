// process.stdin.on('data', function (data) {
// 	const arr = eval(data);
// 	console.log(arr[ { time: 0, value: "yandex" }, { time: 8, value: "adventure", }, { time: 3, value: "010", }, { time: 9, value: "01111", } ]);
// 	const res = parseSignals(arr);
// 	process.stdout.write(res + '');
// 	process.exit();
// });

process.stdin.resume();
// process.stdin.setEncoding('ascii');

let input_stdin = '';
let input_stdin_array = '';
let input_currentline = 0;

process.stdin.on('data', (data) => {
  input_stdin += data;
});

process.stdin.on('end', () => {
  input_stdin_array = input_stdin.split('\n');
  main();
});

function readLine() {
  return input_stdin_array[input_currentline++];
}

function main() {
  const line = readLine();
  console.log(line);
  // const arr = eval(line)
  const res = parseSignals(arr);
  console.log(res);
  process.stdout.write(`${res}`);
}

function parseSignals(arr) {
  let result = '';
  const stringArr = [];
  const signalsArr = [];
  arr.forEach(({ time, value }) => {
    if (isNaN(Number(value))) {
      for (let i = 1; i <= time; i += 1) stringArr.push('_');

      console.log(time, value);
      stringArr.push(...value.split(''));
    } else {
      for (let i = 1; i <= time; i += 1) signalsArr.push('_');

      signalsArr.push(...value.split(''));
    }
  });
  for (let i = 0; i <= signalsArr.length; i += 1) {
    if (signalsArr[i] === '1') result += stringArr[i];
  }
  return result;
}
