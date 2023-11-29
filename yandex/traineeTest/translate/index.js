const fs = require('fs');

const example = require('./src/example');
const solution = require(`./src/solution`);

const { changeLanguage, translate } = require('./src/translations');

const newFns = solution(translate);

const result = example(newFns, changeLanguage);

fs.writeFileSync('./output.json', JSON.stringify(result, null, 2));
