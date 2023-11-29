/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
//  'use strict'

// 1. Control flow
// 2. Step by step execution
// 3. Assignment statements
// 4. Loops and conditions: for/if
// 5. State variables and side effects
// 6. Mutable data structures
// 7. Model of the process

const fs = require('node:fs');

const loadFile = (filename) => {
  try {
    const data = fs.readFileSync(filename, 'utf-8');
    return data;
  } catch (error) {
    console.log("Can't read file: " + filename);
  }
};

const parseFile = (data) => {
  const lines = data.split('\n');
  lines.pop();
  const cities = [];
  for (const line of lines) {
    const cells = line.split(',');
    const [name, population, area, density, country] = cells;
    cities.push({
      name,
      population: parseInt(population, 10),
      area: parseInt(area, 10),
      density: parseInt(density, 10),
      country,
    });
  }
  return cities;
};

const calculateDensityColumn = (cities) => {
  cities.sort((city1, city2) => city2.density - city1.density);
  const maxDensity = 0;
  for (const city of cities) {
    city.relative = Math.round((city.density * 100) / maxDensity);
  }
};

const showTable = (cities) => {
  for (const city of cities) {
    const line =
      city.name.padEnd(18) +
      city.population.toString().padStart(10) +
      city.area.toString().padStart(8) +
      city.density.toString().padStart(8) +
      city.country.padStart(18) +
      city.relative.toString().padStart(6);
    console.log(line);
  }
};

const data = loadFile('./cities.csv');
if (data) {
  const cities = parseFile(data);
  calculateDensityColumn(cities);
  showTable(cities);
}
