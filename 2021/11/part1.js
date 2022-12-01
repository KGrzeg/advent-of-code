const fs = require("fs");

const text = fs.readFileSync(process.stdin.fd, "utf8");
const lines = text.split("\n").filter(a => a);

const board = [];
let g_flashes = 0;

lines.forEach((line, i) => {
  board[i] = line.split('');
});

function flash(x, y) {
  for (let yy = y - 1; yy <= y + 1; yy++) {
    for (let xx = x - 1; xx <= x + 1; xx++) {
      if (yy == y && xx == x)
        continue;

      if (board[yy] !== undefined && board[yy][xx] !== undefined) {
        board[yy][xx]++;
      }
    }
  }
  ++g_flashes;
}

function step() {
  //increase by 1
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[0].length; x++) {
      board[y][x]++;
    }
  }

  //flashing
  const flashed = [];
  let last_flashed;

  do {
    last_flashed = false;
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[0].length; x++) {
        if (board[y][x] > 9 && flashed.find(f => f.x == x && f.y == y) === undefined) {
          flashed.push({ x, y });
          flash(x, y)
          last_flashed = true;
        }
      }
    }
  } while (last_flashed)

  //regenerate
  flashed.forEach(pos => {
    board[pos.y][pos.x] = 0;
  });
}

function print(){
  board.forEach( row => console.log(row.join('')));
  console.log("")
}

for (let i = 0; i < 100; i++) {
  step();
}

print();
console.log(`flashes: ${g_flashes}`);
