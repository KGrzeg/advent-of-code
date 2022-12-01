const fs = require("fs");

const text = fs.readFileSync(process.stdin.fd, "utf8");
const lines = text.split("\n").filter(a => a);

let gamma = "";
let epsilon = "";

for (let x = 0; x < lines[0].length; x++) {
  let ones = 0;
  for (let y = 0; y < lines.length; y++) {
    if (lines[y][x] == '1') {
      ones++;
    } else {
      ones--;
    }
  }
  if (ones > 0) {
    gamma += "1"
    epsilon += "0"
  } else {
    gamma += "0"
    epsilon += "1"
  }
}

const points = parseInt(gamma, 2) * parseInt(epsilon, 2);
console.log(points);
