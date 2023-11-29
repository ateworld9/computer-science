const fs = require("node:fs/promises");
const path = require("node:path");

async function read(filename = "input.txt") {
  try {
    return await fs.readFile(path.join(path.resolve(), filename), {
      encoding: "utf8",
    });
  } catch (err) {
    console.error(err.message);
    return -1;
  }
}

function vectorLength(x, y) {
  return Math.sqrt(x * x + y * y);
}

function calcAngleBtwPointAndX(x, y) {
  return Math.atan2(y, x);
}

function findPathLength(xA, yA, xB, yB) {
  const OA = vectorLength(xA, yA);
  const AOx = calcAngleBtwPointAndX(xA, yA);
  const OB = vectorLength(xB, yB);
  const BOx = calcAngleBtwPointAndX(xB, yB);

  const AOB = Math.abs(OA) + Math.abs(OB);
  const L = Math.min(OA, OB) * Math.abs(AOx - BOx) + Math.abs(OA - OB);

  return Math.min(AOB, L);
}

async function main() {
  let str = await read();

  str = str.slice(0, -1);
  // parse file string

  const [xA, yA, xB, yB] = str.split(" ").map(Number);
  const L = findPathLength(xA, yA, xB, yB);

  try {
    await fs.writeFile("output.txt", L.toString());
  } catch (err) {
    console.error(err.message);
  }
}

main();

// console.log(calcAngleDegrees(0, 5));
// console.log(calcAngleDegrees(4, 3));
// console.log(calcAngleDegrees(4, -3));
