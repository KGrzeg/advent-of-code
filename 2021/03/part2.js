const fs = require("fs");

const text = fs.readFileSync(process.stdin.fd, "utf8");
const lines = text.split("\n").filter(a => a);

let oxygen = Array.prototype.slice.call(lines);
let co2 = Array.prototype.slice.call(lines);

let oxygen_pts = null;
let co2_pts = null;

for (let x = 0; x < lines[0].length; x++) {
  if (oxygen_pts === null) {
    let ones = 0;
    for (let y = 0; y < oxygen.length; y++) {
      if (oxygen[y][x] == '1') {
        ones++;
      } else {
        ones--;
      }
    }

    if (ones >= 0) {
      oxygen = oxygen.filter(line => line[x] == '1')
    } else {
      oxygen = oxygen.filter(line => line[x] == '0')
    }

    if (oxygen.length == 1)
      oxygen_pts = parseInt(oxygen[0], 2);
  }
  if (co2_pts === null) {
    let ones = 0;
    for (let y = 0; y < co2.length; y++) {
      if (co2[y][x] == '1') {
        ones++;
      } else {
        ones--;
      }
    }

    if (ones >= 0) {
      co2 = co2.filter(line => line[x] == '0')
    } else {
      co2 = co2.filter(line => line[x] == '1')
    }

    if (co2.length == 1)
      co2_pts = parseInt(co2[0], 2);
  }
}

const points = oxygen_pts * co2_pts;
console.log(points);
