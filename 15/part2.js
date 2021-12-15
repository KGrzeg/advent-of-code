const fs = require("fs");
const Graph = require('node-dijkstra')
const chalk = require("chalk");

const text = fs.readFileSync(process.stdin.fd, "utf8");
const lines = text.split("\n").filter(a => a);

const map = [];
const route = new Graph();

lines.forEach(line => {
  map.push(line.split('').map(n => parseInt(n)));
});

function printColored(path = []) {
  const bg = chalk.black;
  const fg = chalk.green;
  for (let y = 0; y < heightM; ++y) {
    for (let x = 0; x < widthM; ++x) {
      const c = path.find(p => p == `${x},${y}`) === undefined ? bg : fg;
      process.stdout.write(c(getField(x, y)));
    }
    console.log('');
  }
}

const height = map.length;
const width = map[0].length;
const heightM = height * 5;
const widthM = width * 5;

function getField(x, y) {
  const modifier = Math.floor(x / width) + Math.floor(y / height);
  return (modifier + map[y % height][x % width] - 1) % 9 + 1;
}

console.log("build graph...");
(function generateRoute() {
  const dirs = (x, y) => [
    [x + 1, y],
    [x, y + 1],
    [x - 1, y],
    [x, y - 1],
  ];

  for (let y = 0; y < heightM; ++y) {
    for (let x = 0; x < widthM; ++x) {
      const sibs = [];
      dirs(x, y).forEach(dir => {
        if (0 <= dir[0] && dir[0] < widthM &&
          0 <= dir[1] && dir[1] < heightM) {
          sibs.push(dir);
        }
      });

      const sibsEdges = sibs.reduce((acc, p) => {
        acc[`${p[0]},${p[1]}`] = getField(p[0], p[1]);
        return acc;
      }, {});

      route.addVertex(`${x},${y}`, sibsEdges);
    }
  }
})();

console.log(`width: ${width}, height: ${height}`);
console.log(`widthM: ${widthM}, heightM: ${heightM}`);
console.log("find path...");
const [_, ...path] = route.shortestPath('0,0', `${widthM - 1},${heightM - 1}`);

// printColored(path);
(function sumRisks() {
  let sum = path.reduce((acc, r) => {
    const [x, y] = r.split(',');
    return acc + getField(x, y);
  }, 0);
  console.log("Sum: ", sum);
})();
