const fs = require("fs");

const text = fs.readFileSync(process.stdin.fd, "utf8");
const lines = text.split("\n");

const CONTINUE = "right..ish?";
const RIGHT = "RIGHT!";
const ERROR = "mmm, NOPE#@!";

function compare(a, b) {
  // console.log(`Compare ${JSON.stringify(a)} vs ${JSON.stringify(b)}`)

  if (typeof a == 'number' && typeof b == 'number') {
    if (a < b)
      return RIGHT;
    if (b < a)
      return ERROR;
    return CONTINUE;
  }

  if (a instanceof Array && b instanceof Array) {
    for (let i = 0; i < a.length; ++i) {
      if (b[i] == undefined) return ERROR;

      const result = compare(a[i], b[i]);

      if (result == ERROR) return ERROR;
      if (result == RIGHT) return RIGHT;
    }
    if (b.length > a.length)
      return RIGHT;
    return CONTINUE;
  }

  if (typeof a == 'number' && b instanceof Array)
    return compare([a], b);
  if (a instanceof Array && typeof b == 'number')
    return compare(a, [b]);

  throw new Error("That should not happen. EVER!");
}

let sum = 0;
let index = 0;
do {
  const left = JSON.parse(lines[index++])
  const right = JSON.parse(lines[index++])

  const result = compare(left, right);
  // console.log(`Result ${JSON.stringify(left)} with ${JSON.stringify(right)}: ${result}`);
  if (result != ERROR) {
    let j = Math.ceil(index / 3)
    // console.log("#  add " + j)
    // console.log(JSON.stringify(left))
    // console.log(JSON.stringify(right))
    sum += j
  }

  ++index;
} while (index < lines.length)

console.log("SUM: " + sum)
