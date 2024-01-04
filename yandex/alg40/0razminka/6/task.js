/* eslint-disable no-continue */
/* eslint-disable for-direction */
/* eslint-disable no-undef */
/* eslint-disable no-lonely-if */
/* eslint-disable no-param-reassign */
const fs = require('node:fs/promises');
const path = require('node:path');

async function read(filename = 'input.txt') {
	try {
		return await fs.readFile(path.join(path.resolve(), filename), {
			encoding: 'utf8',
		});
	} catch (err) {
		console.error(err.message);
		return -1;
	}
}

function lift(seatsNumber, floors) {
	let resultTime = 0;
	let leftSeats = 0;

	for (let i = floors.length - 1; i >= 0; i -= 1) {
		if (floors[i] === 0) {
			continue;
		}
		if (floors[i] > leftSeats) {
			resultTime +=
				Math.ceil((floors[i] - leftSeats) / seatsNumber) * (i + 1) * 2;
			leftSeats =
				seatsNumber - ((floors[i] - leftSeats) % seatsNumber || seatsNumber);
		} else {
			leftSeats -= floors[i];
		}
	}
	return resultTime;
}

async function main() {
	let str = await read();

	str = str.slice(0, -1);
	// parse file string

	const lines = str.split('\n').map(Number);

	const result = lift(lines[0], lines.slice(2));
	try {
		await fs.writeFile('output.txt', result.toString());
	} catch (err) {
		console.error(err.message);
	}
}

main();

// function lift(capacity, arr) {
//   let result = BigInt(0);
//   let level = 0;
//   let rest = 0;
//   let lastLevel = 0;
//   console.log(arr, capacity);
//   while (level <= arr.length) {
//     console.log(result, rest, level, arr[level]);
//     if (rest > 0 && arr[level] === 0) { // если остался остаток с верхних считаем каждый пустой этаж
//       result += BigInt(1); // добавляем 1 тк лифт не полный
//       level += 1; // спускаемся тк никого
//     } else if (rest > 0 && arr[level] > rest) { // если Остались на этаже  ......ЛИФТ полный
//       result += BigInt(1);
//       arr[level] -= rest;
//       rest = 0;
//       result += BigInt(arr.length - level); // добавляем время спуска вниз , тк лифт полный
//       // level += 0; // не спускаемся, тк вернемся сюда
//     } else if (rest > 0 && arr[level] === rest) {
//       // result += BigInt(1);
//       rest = 0;
//       result += BigInt(arr.length - level); // добавляем время спуска вниз , тк лифт полный
//       level += 1;
//     } else if (rest > 0 && arr[level] < rest) { // если на этаже НИКОГО .......Лифт не полный
//       result += BigInt(1); // добавляем 1 тк лифт не полный
//       rest -= arr[level];
//       level += 1; // спускаемся тк никого
//     } else if (rest > 0 && level === arr.length) {
//       level += 1;
//       result += BigInt((arr.length - lastLevel) + 1);
//     } else if (arr[level] === 0) {
//       level += 1;
//     } else if (level === arr.length) {
//       level += 1;
//     } else { // поднимаемся и делаем максимальное количество "ходок" , оставляем остаток
//       console.log(arr[level]);
//       result += BigInt(Math.floor(arr[level] / capacity) * (arr.length - level) * 2);
//       rest = arr[level] % capacity;
//       if (rest > 0) {
//         lastLevel = level;
//       }
//       level += 1;
//     }
//     // console.log(result, rest, level, arr[level]);
//   }
//   return result;
// }
