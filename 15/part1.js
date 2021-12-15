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
  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      const c = path.find(p => p == `${x},${y}`) === undefined ? bg : fg;
      process.stdout.write(c(map[y][x]));
    }
    console.log('');
  }
}

const height = map.length;
const width = map[0].length;

console.log("build graph...");
let i = 1;
(function generateRoute() {
  const dirs = (x, y) => [
    [x + 1, y],
    [x, y + 1],
    [x - 1, y],
    [x, y - 1],
  ];

  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      const sibs = [];
      dirs(x, y).forEach(dir => {
        if (0 <= dir[0] && dir[0] < width &&
          0 <= dir[1] && dir[1] < height) {
          sibs.push(dir);
        }
      });

      const sibsEdges = sibs.reduce((acc, p) => {
        acc[`${p[0]},${p[1]}`] = map[p[1]][p[0]];
        return acc;
      }, {});

      route.addVertex(`${x},${y}`, sibsEdges);
    }
  }
})();

console.log(`width: ${width}, height: ${height}`);
console.log("find path...");
const [_, ...path] = route.shortestPath('0,0', `${width - 1},${height - 1}`);

printColored(path);
(function sumRisks() {
  let sum = path.reduce((acc, r) => {
    const [x, y] = r.split(',');
    return acc + map[y][x];
  }, 0);
  console.log("Sum: ", sum);
})();
