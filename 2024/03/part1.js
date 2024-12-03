const readline = require('readline');

function* each_re(str, re) {
  let arr;
  while ((arr = re.exec(str)) !== null) {
    yield arr;
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let answer = 0;

const process_line = (line) => {
  const mul_re = /mul\(([0-9]{1,3},[0-9]{1,3})\)/gm;
  for (let match of each_re(line, mul_re)) {
    const nums = match[1].split(",").map(n => parseInt(n));
    answer += nums[0] * nums[1];
  }
}

rl.on('line', process_line);
rl.once('close', () => {
  console.log('answer:', answer);
})
