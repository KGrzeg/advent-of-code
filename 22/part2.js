const fs = require("fs");

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
      min: Number(min),
      max: Number(max)
    };
  });
  return ret;
});

class PowerRanger {
  constructor(min = Infinity, max = -Infinity, value = false) {
    this.min = min;
    this.max = max;
    this.ranges = [];
  }

  extend(min, max) {
    if (min < this.min) {
      this.min = min;
      if (this.ranges.length)
        this.ranges[0].min = min;
    }

    if (max < this.max) {
      this.max = max;
      if (this.ranges.length)
        this.ranges[this.ranges.length - 1].max = max;
    }
  }

  claim(min, max, value) {
    this.extend(min, max);

    if (this.ranges.length == 0) {
      this.ranges.push({
        min, max, value
      });
      return;
    }

    for (let i = 0; i < this.ranges.length; i++) {
      const range = this.ranges[i];
      
      if (max < this.range.min)
        continue;
      
    }
  }

  getValueAt(pos) {
    for (let i = 0; i < this.ranges.length; i++) {
      const range = this.ranges[i];
      if (range.min <= pos && pos <= range.max)
        return range.value;
    }
  }
}

class Reactor {
  cells = [];
  mins = [Infinity, Infinity, Infinity];
  maxs = [-Infinity, -Infinity, -Infinity];
  boxes = [];

  extends(box) {
    this.mins[X] = Math.min(this.mins[X], box.x.min);
    this.mins[Y] = Math.min(this.mins[Y], box.y.min);
    this.mins[Z] = Math.min(this.mins[Z], box.z.min);

    this.maxs[X] = Math.max(this.maxs[X], box.x.max);
    this.maxs[Y] = Math.max(this.maxs[Y], box.y.max);
    this.maxs[Z] = Math.max(this.maxs[Z], box.z.max);
  }

  claim(box) {
    this.extends(box);
    this.boxes.push(box);
  }

  checkState(x, y, z) {
    let state = false;
    this.boxes.forEach(box => {
      if (box.x.min <= x && x <= box.x.max &&
        box.y.min <= y && y <= box.y.max &&
        box.z.min <= z && z <= box.z.max)
        state = box.state;
    })
    return state;
  }

  count() {
    let counter = 0, step = 0;
    const steps = (this.maxs[X] - this.mins[X]) *
      (this.maxs[Y] - this.mins[Y]) *
      (this.maxs[Z] - this.mins[Z]);

    for (let x = this.mins[X]; x <= this.maxs[X]; ++x)
      for (let y = this.mins[Y]; y <= this.maxs[Y]; ++y)
        for (let z = this.mins[Z]; z <= this.maxs[Z]; ++z) {
          if (this.checkState[x, y, z] === true) ++counter;
          ++step;

          if (step % 10000 == 0) {
            console.log(`Count step ${step} out of ${steps}, ${step / steps * 100}%`);
          }
        }

    return counter;
  }
}

const chernobyl = new Reactor();
let i = 1;
boxes.forEach(
  box => {
    console.log(`Step ${i++} out of ${boxes.length}...`);
    chernobyl.claim(box)
  }
);

console.log(chernobyl.count());
