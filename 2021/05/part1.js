const fs = require("fs");

const text = fs.readFileSync(process.stdin.fd, "utf8");
const lines = text.split("\n").filter(a => a);
let points = 0;

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

  //horrizontal
  if (p1.y == p2.y) {
    let lx = Math.min(p1.x, p2.x);
    let rx = Math.max(p1.x, p2.x);
    for (let x = lx; x <= rx; ++x) {
      drawPoint(x, p1.y);
    }
    //verticall
  }else if (p1.x == p2.x) {
    let ty = Math.min(p1.y, p2.y);
    let by = Math.max(p1.y, p2.y);
    for (let y = ty; y <= by; ++y) {
      drawPoint(p1.x, y);
    }
  }
}

linesToDraw.forEach(line => {
  drawLine(line)
});

console.log(points);
