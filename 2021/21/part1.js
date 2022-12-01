const fs = require("fs");

const text = fs.readFileSync(process.stdin.fd, "utf8");
const lines = text.split("\n").filter(a => a);

const SCORE_CAP = 21;
const ROLLS_PER_TURN = 3;

const positions = lines.map(line => {
  const parts = line.split(' ');
  return parseInt(parts[parts.length - 1]);
});

const scores = [];
scores.length = positions.length;
scores.fill(0);

let rolls = 0;

function* deterministicDice() {
  var index = 1;
  while (true)
    yield index++;
}

function someoneWin() {
  for (let i = 0; i < scores.length; ++i) {
    if (scores[i] >= SCORE_CAP) {
      return i;
    }
  }

  return false;
}

function doMove(player, count) {
  positions[player] += count;

  positions[player] = (positions[player] - 1) % 10 + 1;
  scores[player] += positions[player];
}

function doTurn(dice, player) {
  let sum = 0;

  for (let i = 0; i < ROLLS_PER_TURN; ++i) {
    sum += dice.next().value;
    ++rolls;
  }

  doMove(player, sum);
}

function countResult(winner = someoneWin()) {
  if (winner == 0)
    return rolls * scores[1];
  return rolls * scores[0];
}

const dice = deterministicDice();
console.log(`Start positions: [${positions.join(',')}]`);
while (true) {
  for (let player = 0; player < positions.length; ++player) {
    winner = someoneWin();
    if (winner !== false) {
      console.log(`Player ${winner} wins!`);
      console.log(`Scores: [${scores.join(',')}]`);
      console.log(`Positions: [${positions.join(',')}]`);
      console.log(`Result: ${countResult()}`);
      process.exit();
    }
    doTurn(dice, player);
  }

  if (rolls > 10_000) {
    console.log("Rolls over 10 000, emergency break");
    process.exit();
  }
}
