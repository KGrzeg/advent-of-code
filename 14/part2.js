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
let ocurences = {};
const letters = {};

(function readInput() {
  for (let i = 1; i < lines.length; ++i) {
    if (lines[i].length == 0)
      break;
    const [key, val] = lines[i].split(' -> ');
    recipes[key] = val;
    ocurences[key] = 0;
    letters[key[0]] = 0
    letters[key[1]] = 0
    letters[val] = 0
  }
})();

function getClearRecipes() {
  const ret = Object.assign({}, recipes);
  for (const key in ret) {
    ret[key] = 0;
  }

  return ret;
}

function addRecipes(a, b) {
  for (const key in a) {
    a[key] += b[key] || 0;
  }
}

function grow() {
  const next = {};

  for (const key in ocurences) {
    const val = ocurences[key];

    if (!val) continue;

    letters[recipes[key]] += val;

    const lKey = key[0] + recipes[key];
    const rKey = recipes[key] + key[1];

    if (recipes[lKey] !== undefined) {
      if (next[lKey] === undefined) next[lKey] = 0;
      next[lKey] += val;
    }
    if (recipes[rKey] !== undefined) {
      if (next[rKey] === undefined) next[rKey] = 0;
      next[rKey] += val;
    }
  }

  ocurences = getClearRecipes();
  addRecipes(ocurences, next);
}

(function breakIntoOcurences() {
  for (let i = 0; i < formula.length - 1; ++i) {
    const [a, b] = [formula[i], formula[i + 1]];
    const key = a + b;

    if (i == 0)
      letters[a] = 1;

    if (letters[b] === undefined)
      letters[b] = 0;
    letters[b]++;

    if (ocurences[key] !== undefined)
      ocurences[key]++;
  }
})();

(function simulate() {
  for (let i = 1; i <= 40; ++i) {
    formula = grow(formula);
    console.log(`Step ${i}...`);
  }
})();


(function countLetters() {
  let min = Infinity;
  let max = -Infinity;

  for (const k in letters) {
    min = Math.min(min, letters[k]);
    max = Math.max(max, letters[k]);
  }

  console.log(`${max} - ${min} = ${max - min}`);
})()


