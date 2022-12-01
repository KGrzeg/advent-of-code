const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let inc = 0;
let last = null;
const window = [];
let i = 0

rl.on('line', function (line) {
  ++i;
  const val = parseInt(line);
  window.push(val);

  if (i >= 3) {
    const sum =
      window[window.length - 1] +
      window[window.length - 2] +
      window[window.length - 3];

    if (last !== null && sum > last)
      inc++;

    last = sum
  }

  if (i >= 4)
    window.shift();
})

rl.on('close', function () {
  console.log("Increased by " + inc);
})
