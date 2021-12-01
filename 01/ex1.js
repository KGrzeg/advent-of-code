const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let [inc, dec, last] = [0, 0, null];

rl.on('line', function (line) {
  let val = parseInt(line);
  if (last !== null) {
    if (last < val) 
      inc++;
    
    if (last > val) 
      dec++;
    
  }
  last = val;
})

rl.on('close', function () {
  console.log("Increased by " + inc);
})
