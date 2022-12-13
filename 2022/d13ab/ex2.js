const fs = require("fs");

const text = fs.readFileSync(process.stdin.fd, "utf8");
const lines = text.split("\n").filter(a => a);

const CONTINUE = "right..ish?";
const RIGHT = "RIGHT!";
const ERROR = "mmm, NOPE#@!";

const cache = {};

function compare(a, b) {
  const argString = `${JSON.stringify(a)}_${JSON.stringify(b)}}`;
  if (cache[argString])
    return cache[argString]
  // console.log(`Compare ${JSON.stringify(a)} vs ${JSON.stringify(b)}`)

  if (typeof a == 'number' && typeof b == 'number') {
    if (a < b) {
      cache[argString] = RIGHT;
      return RIGHT;
    }
    if (b < a) {
      cache[argString] = ERROR;
      return ERROR;
    }
    cache[argString] = CONTINUE;
    return CONTINUE;
  }

  if (a instanceof Array && b instanceof Array) {
    for (let i = 0; i < a.length; ++i) {
      if (b[i] == undefined) {
        cache[argString] = ERROR;
        return ERROR;
      }

      const result = compare(a[i], b[i]);

      if (result == ERROR) return ERROR;
      if (result == RIGHT) return RIGHT;
    }
    if (b.length > a.length) {
      cache[argString] = RIGHT;
      return RIGHT;
    }
    cache[argString] = CONTINUE;
    return CONTINUE;
  }

  if (typeof a == 'number' && b instanceof Array) {
    const res = compare([a], b)
    cache[argString] = res;
    return res;
  }
  if (a instanceof Array && typeof b == 'number') {
    const res = compare(a, [b])
    cache[argString] = res;
    return res
  }

  throw new Error("That should not happen. EVER!");
}

lines.push('[[2]]')
lines.push('[[6]]')

const sortedLines = lines.sort((a, b) => {
  const left = JSON.parse(a)
  const right = JSON.parse(b)
  const result = compare(left, right);

  if (result == ERROR)
    return 1;
  return -1;
})

let mul1, mul2;
for (let i = 0; i < sortedLines.length; ++i) {
  if (sortedLines[i] == '[[2]]')
    mul1 = i + 1;
  if (sortedLines[i] == '[[6]]')
    mul2 = i + 1;
}

console.log("Sum: " + (mul1 * mul2))
