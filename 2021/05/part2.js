const fs = require("fs");

const text = fs.readFileSync(process.stdin.fd, "utf8");
const lines = text.split("\n").filter(a => a);
let points = 0;

const dirs = {
  0: [1, 0],
  0.25: [1, 1],
  0.5: [0, 1],
  0.75: [-1, 1],
  1: [-1, 0],
  "-0.75": [-1, -1],
  "-0.5": [0, -1],
  "-0.25": [1, -1]
}

const linesToDraw = lines.map(l => {
  const points = l.split(' -> ');
  const xy1 = points[0]
    .split(',')
    .map(e => parseInt(e));
  const xy2 = points[1]
    .split(',')
    .map(e => parseInt(e));

  return {
    p1: {
      x: xy1[0],
      y: xy1[1],
    },
    p2: {
      x: xy2[0],
      y: xy2[1],
    },
  }
})

const canvas = [];

function drawPoint(x, y) {
  if (!canvas[y]) {
    canvas[y] = [];
  }
  if (!canvas[y][x]) {
    canvas[y][x] = 0;
  }
  canvas[y][x]++;

  if (canvas[y][x] == 2) {
    ++points;
  }
}

function drawLine(line) {
  const { p1, p2 } = line;
  const vec = [p2.x - p1.x, p2.y - p1.y];
  const angle = Math.atan2(vec[1], vec[0]) / Math.PI;
  const dir = dirs[angle];

  let p = [p1.x, p1.y];
  do {
    drawPoint(...p);
    p[0] += dir[0];
    p[1] += dir[1];
  }
  while (!(p[0] == p2.x && p[1] == p2.y))
  drawPoint(...p);
}

linesToDraw.forEach(line => {
  drawLine(line)
});

console.log(points);
