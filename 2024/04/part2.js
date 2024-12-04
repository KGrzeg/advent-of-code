const readline = require("readline");

function* forEach2d(arr) {
  for (let y = 0; y < arr.length; ++y) {
    const row = arr[y];

    for (let x = 0; x < row.length; ++x) {
      const cell = row[x];
      yield [cell, x, y, arr];
    }
  }
}

function in_arr(arr, x, y) {
  return x >= 0 && y >= 0 && x < arr[0].length && y < arr.length;
}

function* forCellsInLine(arr, sx, sy, vx, vy, len) {
  let x = sx,
    y = sy;
  for (let i = 0; i < len; ++i) {
    if (in_arr(arr, x, y)) {
      yield arr[y][x];
    } else {
      yield undefined;
      return;
    }

    x += vx;
    y += vy;
  }
}

function* forCellsInStar(arr, sx, sy, len) {
  const vectors = [
    [1, 1],
    [-1, 1],
    [-1, -1],
    [1, -1],
  ];

  for (const [vx, vy] of vectors) {
    yield [...forCellsInLine(arr, sx, sy, vx, vy, len)];
  }
}

function findX(arr, sx, sy) {
  const lookupLen = 2;

  const lines = [...forCellsInStar(arr, sx, sy, lookupLen)];
  if (lines.find((line) => line.length !== lookupLen)) return 0;

  let count_m = 0;
  let count_s = 0;

  for (const line of lines) {
    if (line[1] === "M") count_m++;
    if (line[1] === "S") count_s++;
  }

  if (count_m !== count_s || count_m !== 2) return 0;

  if (lines[0][1] === lines[2][1] || lines[1][1] === lines[3][1]) return 0;

  return 1;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const map = [];
const process_line = (line) => {
  map.push(line.split(""));
};

rl.on("line", process_line);
rl.once("close", () => {
  let answer = 0;

  for (let [cell, x, y, arr] of forEach2d(map)) {
    if (cell !== "A") continue;

    answer += findX(arr, x, y);
  }

  console.log("answer:", answer);
});
