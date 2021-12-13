const fs = require("fs");

const text = fs.readFileSync(process.stdin.fd, "utf8");
const lines = text.split("\n");

const EMPTY = 0;
const DOT = 1;
const board = [];

let [maxx, maxy] = [0, 0];
const folds = [];

(function readInput() {
  let line, i = 0;

  do {
    line = lines[i++];
    if (line.length == 0) break;

    const [x, y] = line
      .split(',')
      .map(p => parseInt(p));

    if (board[y] === undefined)
      board[y] = [];

    board[y][x] = DOT;
    maxx = Math.max(maxx, x);
    maxy = Math.max(maxy, y);
  } while (line !== "")

  do {
    line = lines[i++];
    if (line.length == 0) break;
    let [axis, len] = line.split('=');
    axis = axis[axis.length - 1]
    len = parseInt(len); //it can deal with semicolon!

    folds.push({ axis, len });
  } while (i < lines.length)

  for (let y = 0; y <= maxy; y++) {
    for (let x = 0; x <= maxx; x++) {
      if (board[y] === undefined)
        board[y] = [];
      if (board[y][x] === undefined)
        board[y][x] = EMPTY;
    }
  }

})()

function fold(desc) {
  if (desc.axis == 'x') {
    //fold left
    for (let y = 0; y <= maxy; ++y) {
      for (let x = 1; x < maxx - desc.len + 1; ++x) {
        board[y][desc.len - x] += board[y][desc.len + x];
      }
      board[y].length = desc.len;
    }
    maxx = desc.len - 1;
  } else {
    //fold up
    for (let x = 0; x <= maxx; ++x) {
      for (let y = 1; y <= maxy - desc.len; ++y) {
        board[desc.len - y][x] += board[desc.len + y][x];
      }
    }
    board.length = desc.len;
    maxy = desc.len - 1;
  }
}

function count() {
  let ret = 0;

  board.forEach(row => {
    row.forEach(cell => {
      if (cell !== EMPTY)
        ret += 1;
    })
  })

  return ret;
}

function normalize() {
  for (let y = 0; y <= maxy; y++)
    for (let x = 0; x <= maxx; x++)
      board[y][x] = board[y][x] == EMPTY ? ' ' : '#';
}


function printBoard() {
  board.forEach(row => console.log(row.join(' ')));
}

for (let i = 0; i < folds.length; i++) {
  const f = folds[i];

  fold(f);
  if (i == 0) {
    console.log("count after first:", count());
  }
}

normalize();
printBoard();
