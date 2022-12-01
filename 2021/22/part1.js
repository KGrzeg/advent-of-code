const fs = require("fs");

const LIM_MIN = -50;
const LIM_MAX = 50;
const X = 0;
const Y = 1;
const Z = 2;

const text = fs.readFileSync(process.stdin.fd, "utf8");
const lines = text.split("\n").filter(a => a);

const boxes = lines.map(line => {
  let [state, coords] = line.split(' ');
  state = state == 'on';
  const ret = { state };
  coords.split(',').forEach(range => {
    const [axis, val] = range.split('=');
    const [min, max] = val.split('..');
    ret[axis] = {
      min: Math.max(Number(min), LIM_MIN),
      max: Math.min(Number(max), LIM_MAX)
    };
  });
  return ret;
});

class Reactor {
  cells = [];
  mins = [LIM_MAX, LIM_MAX, LIM_MAX];
  maxs = [LIM_MIN, LIM_MIN, LIM_MIN];

  extends(box) {
    this.mins[X] = Math.min(this.mins[X], box.x.min, LIM_MAX);
    this.mins[Y] = Math.min(this.mins[Y], box.y.min, LIM_MAX);
    this.mins[Z] = Math.min(this.mins[Z], box.z.min, LIM_MAX);

    this.maxs[X] = Math.max(this.maxs[X], box.x.max, LIM_MIN);
    this.maxs[Y] = Math.max(this.maxs[Y], box.y.max, LIM_MIN);
    this.maxs[Z] = Math.max(this.maxs[Z], box.z.max, LIM_MIN);

    for (let x = this.mins[X]; x <= this.maxs[X]; ++x) {
      if (this.cells[x] === undefined) this.cells[x] = [];

      for (let y = this.mins[Y]; y <= this.maxs[Y]; ++y)
        if (this.cells[x][y] === undefined) this.cells[x][y] = [];

    }
  }

  claim(box) {
    this.extends(box);

    for (let x = box.x.min; x <= box.x.max; ++x) {
      for (let y = box.y.min; y <= box.y.max; ++y) {
        for (let z = box.z.min; z <= box.z.max; ++z) {
          this.cells[x][y][z] = box.state;
        }
      }
    }
  }

  count() {
    let counter = 0;
    for (let x = this.mins[X]; x <= this.maxs[X]; ++x)
      for (let y = this.mins[Y]; y <= this.maxs[Y]; ++y)
        for (let z = this.mins[Z]; z <= this.maxs[Z]; ++z)
          if (this.cells[x][y][z] === true)
            ++counter;

    return counter;
  }
}

const chernobyl = new Reactor();
boxes.forEach(
  box => chernobyl.claim(box)
);

console.log(chernobyl.count());
