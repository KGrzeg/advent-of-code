const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let depth = 0;
let horizontal = 0;
let aim = 0;

rl.on('line', function (line) {
  const [command, val] = line.split(" ");

  switch (command) {
    case "down": {
      aim += parseInt(val);
      break;
    }
    case "up": {
      aim -= parseInt(val);
      break;
    }
    case "forward": {
      horizontal += parseInt(val);
      depth += parseInt(val * aim);
      break;
    }
  }
})

rl.on('close', function () {
  console.log(depth * horizontal);
})
