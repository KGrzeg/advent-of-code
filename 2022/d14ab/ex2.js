const fs = require("fs");

const text = fs.readFileSync(process.stdin.fd, "utf8");
const lines = text.split("\n");

const AIR = '.';
const ROCK = '#';
const SAND = 'o';
const SOURCE = '+';

const map = {
  data: [],
  limits: {
    left: Infinity,
    right: -Infinity,
    top: Infinity,
    bottom: -Infinity,
  },
  source: {
    x: 500,
    y: 0
  },
  reachedSource: false,

  put(x, y, WHAT) {
    const THAT = WHAT; //solving puzzles should give you FuN!
    if (this.data[y] == undefined)
      this.data[y] = []
    this.data[y][x] = THAT;

    this.limits.left = Math.min(this.limits.left, x);
    this.limits.right = Math.max(this.limits.right, x);
    this.limits.top = Math.min(this.limits.top, y);
    this.limits.bottom = Math.max(this.limits.bottom, y);

    // console.log(`Put ${x}x${y} : ${WHAT}`)
  },
  get(x, y) {
    const field = this.data[y]?.[x]

    if (y == this.limits.bottom) return ROCK;
    if (!field) {
      // this.limits.left = Math.min(this.limits.left, x);
      // this.limits.right = Math.max(this.limits.right, x);

      return AIR;
    }

    return field;
  },
  addRockLine(x1, y1, x2, y2) {
    // console.log(`Call add line ${x1}x${y1} > ${x2}x${y2}`);
    if (x1 == x2) //vertical line
      for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); ++i)
        this.put(x1, i, ROCK);
    if (y1 == y2) //horizontal line
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); ++i)
        this.put(i, y1, ROCK);
  },
  readInput(lines) {
    lines.forEach(line => {
      const steps = line.split(" -> ")
      let lastPoint = steps[0].split(",").map((x) => parseInt(x))
      steps.forEach(step => {
        const currentPoint = step.split(",").map((x) => parseInt(x))
        this.addRockLine(...lastPoint, ...currentPoint);
        lastPoint = currentPoint;
      })
    });
    this.put(this.source.x, this.source.y, SOURCE);
    this.limits.bottom += 2;
  },
  display() {
    let str = '';
    console.log(`board size: ${JSON.stringify(this.limits)}`)
    for (let y = this.limits.top; y <= this.limits.bottom; ++y) {
      for (let x = this.limits.left; x <= this.limits.right; ++x) {
        str += this.get(x, y);
      }
      str += "\n"
    }
    console.log(str);
  },
  dropSandPiece() {
    if (this.get(this.source.x, this.source.y) == SAND) {
      this.reachedSource = true;
      return;
    }
    this.put(this.source.x, this.source.y, SAND);
    this.simulate(this.source.x, this.source.y);
  },
  simulate(x, y) {
    if (this.get(x, y) != SAND)
      throw ["OINK!", x, y, this.data];

    const moves = [
      [0, 1],
      [-1, 1],
      [1, 1]
    ];

    for (let move of moves) {
      const nextX = x + move[0];
      const nextY = y + move[1];

      if (this.get(nextX, nextY) == AIR) {
        this.put(x, y, AIR);
        this.put(nextX, nextY, SAND);
        this.simulate(nextX, nextY);
        return;
      }
    }
  }
}

map.readInput(lines);

let sum = -1;
while (!map.reachedSource) {
  ++sum;
  map.dropSandPiece();
}
map.display();
console.log(`Sum: ${sum}`)
