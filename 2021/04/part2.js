const fs = require("fs");

const text = fs.readFileSync(process.stdin.fd, "utf8");
const lines = text.split("\n");

class Board {
  cells = []
  sum = 0
  cols = [5, 5, 5, 5, 5];
  rows = [5, 5, 5, 5, 5];

  constructor(line_start) {
    for (let i = line_start; i < line_start + 5; i++) {
      this.cells.push(
        lines[i]
          .trim()
          .split(/\s+/g)
          .map(n => {
            n = parseInt(n);
            this.sum += n;
            return n;
          })
      );
    }
  }

  mark(number) {
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        if (this.cells[y][x] == number) {
          this.sum -= number;
          this.cols[x] -= 1;
          this.rows[y] -= 1;
          this.cells[y][x] = 'X';
        }
      }
    }

    for (let i = 0; i < 5; i++)
      if (this.rows[i] <= 0 || this.cols[i] <= 0)
        return true;

    return false;
  }
}


const numbers = lines[0].split(",").map(n => parseInt(n));
const boards = [];

let line_counter = 2;
while (line_counter < lines.length) {
  boards.push(new Board(line_counter));
  line_counter += 6;
}

for (const number of numbers) {
  for (let i = boards.length - 1; i >= 0; --i) {
    const board = boards[i]
    if (board.mark(number)) {
      boards.splice(i, 1);

      if (!boards.length) {
        console.log(board.sum * number);
        process.exit();
      }
    }
  }
}

console.log("Answer not found? ;/");
