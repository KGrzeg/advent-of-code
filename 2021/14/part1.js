const fs = require("fs");

//source: https://coderamblings.wordpress.com/2012/07/09/insert-a-string-at-a-specific-index/
String.prototype.insert = function (index, string) {
  if (index > 0) {
    return this.substring(0, index) + string + this.substr(index);
  }

  return string + this;
};


const text = fs.readFileSync(process.stdin.fd, "utf8");
const lines = text.split("\n").filter(a => a);

let formula = lines[0];
const recipes = {};

(function readInput() {
  for (let i = 1; i < lines.length; ++i) {
    if (lines[i].length == 0)
      break;
    const [key, val] = lines[i].split(' -> ');
    recipes[key] = val;
  }
})()

function grow(formula) {
  const insertions = [];

  for (let i = 0; i < formula.length - 1; ++i) {
    const [a, b] = [formula[i], formula[i + 1]];
    const key = a + b;

    if (recipes[key] !== undefined)
      insertions.push({
        pos: i + 1,
        val: recipes[key]
      });

  }

  let inserted = 0;
  insertions.forEach(ins => {
    formula = formula.insert(ins.pos + inserted, ins.val);
    inserted++;
  });

  return formula;
}

function calcLetters(formula) {
  return formula.split('').reduce((dict, val) => {
    if (dict[val] === undefined) dict[val] = 0;
    dict[val]++;
    return dict;
  }, {})
}

function minMaxLetter(dict) {
  let min = Infinity;
  let max = -Infinity;
  for (const am in dict) {
    min = Math.min(min, dict[am]);
    max = Math.max(max, dict[am]);
  }

  return [min, max];
}

(function simulate() {
  for (let i = 1; i <= 10; ++i) {
    formula = grow(formula);
  }
})();

const letters = calcLetters(formula);
const [min, max] = minMaxLetter(letters);

console.log(`${max} - ${min} = ${max - min}`);


