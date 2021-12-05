const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let depth = 0;
let horizontal = 0;

rl.on('line', function (line) {
  const [command, val] = line.split(" ");

  switch (command) {
    case "forward": {
      horizontal += parseInt(val);
      break;
    }
    case "down": {
      depth += parseInt(val);
      break;
    }
    case "up": {
      depth -= parseInt(val);
      break;
    }
  }
})

rl.on('close', function () {
  console.log(depth * horizontal);
})
