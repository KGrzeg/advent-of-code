import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

class Map {
  state = [];
  numbers = [];
  symbols = [];

  mx = 0;
  my = 0;

  sum = 0;

  set_size(mx, my) {
    this.mx = mx;
    this.my = my;
  }

  set(x1, x2, y, v) {
    if (!this.state[y])
      this.state[y] = [];

    const num = {
      value: v,
    };

    this.numbers.push(num);

    for (let i = x1; i <= x2; ++i)
      this.state[y][i] = num;
  }

  add_symbol(x, y) {
    this.symbols.push({ x, y });
  }

  get_surrounding(x, y) {
    const valid_field = (x, y) => x >= 0
      && x <= this.mx
      && y >= 0
      && y <= this.my;

    return [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
    ].map((([x, y]) => valid_field(x, y) ? [x, y] : undefined)).filter(x => x);
  }

  flag_numbers() {
    for (let symbol of this.symbols) {
      const { x, y } = symbol;
      let nums = new Set();

      this.get_surrounding(x, y).forEach(([x, y]) => {
        if (this.state?.[y]?.[x])
          nums.add(this.state[y][x]);
      });
      nums = [...nums];

      if (nums.length == 2)
        this.sum += nums[0].value * nums[1].value;

    }
  }

  get_sum() {
    return this.sum;
  }
}

function is_digit(character) {
  return (/[0-9]/).test(character);
}

export function process(input) {
  const map = new Map;

  const lines = input.split("\n");
  map.set_size(lines[0].length, lines.length);
  for (let y = 0; y < lines.length; ++y) {
    let buffer = "";
    for (let x = 0; x < lines[y].length; ++x) {
      if (is_digit(lines[y][x])) {
        //continuous number
        buffer += lines[y][x];

      } else if ('.' == lines[y][x]) {
        //empty
        if (buffer.length)
          map.set(x - buffer.length, x - 1, y, Number(buffer));
        buffer = '';

      } else {
        //symbol
        if (buffer.length)
          map.set(x - buffer.length, x - 1, y, Number(buffer));
        buffer = '';
        map.add_symbol(x, y);
      }
    }

    if (buffer.length)
      map.set(lines[0].length - buffer.length, lines[0].length - 1, y, Number(buffer));
    buffer = '';
  }

  map.flag_numbers();

  return `${map.get_sum()}`
}


const __dirname = dirname(fileURLToPath(import.meta.url));
const FILENAME = "input.txt"

function main() {
  const filePath = path.join(__dirname, FILENAME);
  const input = fs.readFileSync(filePath, 'utf8');

  const result = process(input);
  console.log(result);
}


main();
