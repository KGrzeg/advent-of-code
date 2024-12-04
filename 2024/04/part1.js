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
      yield [true, arr[y][x]];
    } else {
      yield [false];
      return;
    }

    x += vx;
    y += vy;
  }
}

function* forCellsInStar(arr, sx, sy, len) {
  const vectors = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ];

  for (const [vx, vy] of vectors) {
    yield [...forCellsInLine(arr, sx, sy, vx, vy, len)];
  }
}

function findWord(arr, sx, sy, word) {
  let found = 0;

  for (const line of forCellsInStar(arr, sx, sy, word.length)) {
    const ok = line.reduce((acc, val) => acc && val, true);
    if (!ok) continue;

    const foundWord = line.map((cell) => cell[1]).join("");
    if (foundWord === word) ++found;
  }
  return found;
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
  const word = "XMAS";

  for (let [cell, x, y, arr] of forEach2d(map)) {
    if (cell !== word[0]) continue;

    answer += findWord(arr, x, y, word);
  }

  console.log("answer:", answer);
});
