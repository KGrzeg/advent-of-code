const readline = require('readline');

function* each_re(str, re) {
  let arr;
  while ((arr = re.exec(str)) !== null) {
    yield arr;
  }
}

function compose_re(...re) {
  return new RegExp(
    re.map(r => `(${r.source})`)
      .join('|'),
    re[0].flags
  );
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let answer = 0;
let enabled = true;

const process_line = (line) => {
  const mul_re = /mul\(([0-9]{1,3},[0-9]{1,3})\)/gm;
  const do_re = /do\(\)/gm;
  const dont_re = /don\'t\(\)/gm;
  const mixed_re = compose_re(mul_re, do_re, dont_re);

  for (let match of each_re(line, mixed_re)) {
    const str = match[0];

    if (str === 'do()') {
      enabled = true;
    } else if (str === 'don\'t()') {
      enabled = false;
    } else {
      if (enabled) {
        const nums = match[2].split(",").map(n => parseInt(n));
        answer += nums[0] * nums[1];
      }
    }
  }
}

rl.on('line', process_line);
rl.once('close', () => {
  console.log('answer:', answer);
})
