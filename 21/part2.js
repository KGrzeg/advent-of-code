const fs = require("fs");

const text = fs.readFileSync(process.stdin.fd, "utf8");
const lines = text.split("\n").filter(a => a);

const SCORE_CAP = 21;

const startPositions = lines.map(line => {
  const parts = line.split(' ');
  return parseInt(parts[parts.length - 1]);
});

function sumArrays(arr1, arr2) {
  return [arr1[0] + arr2[0], arr1[1] + arr2[1]];
}

let possibleRolls = (function generateRolls() {
  let acc = [];
  for (let d1 = 1; d1 <= 3; ++d1) {
    for (let d2 = 1; d2 <= 3; ++d2) {
      for (let d3 = 1; d3 <= 3; ++d3) {
        acc.push(d1 + d2 + d3);
      }
    }
  }
  return acc;
})();

const multiverse = {};

class Universe {
  constructor(positions = [0, 0], scores = [0, 0]) {
    this.positions = Array.prototype.slice.call(positions);
    this.scores = Array.prototype.slice.call(scores);
  }

  split() {
    return new Universe(this.positions, this.scores);
  }

  doMove(player, count) {
    this.positions[player] += count;
    this.positions[player] = (this.positions[player] - 1) % 10 + 1;
    this.scores[player] += this.positions[player];
  }

  simulateStep(player, roll) {
    this.doMove(player, roll);
    if (this.scores[player] >= SCORE_CAP) return true;
    return false;
  }

  simulate() {
    const h = this.hash();
    if (multiverse[h] !== undefined) {
      return multiverse[h];
    }

    let wins = [0, 0];

    for (let i = 0; i < possibleRolls.length; i++) {
      const roll = possibleRolls[i];

      const uniA = this.split();
      if (uniA.simulateStep(0, roll)) {
        wins[0]++;

      } else {
        for (let i = 0; i < possibleRolls.length; i++) {
          const roll = possibleRolls[i];

          const uniB = uniA.split();
          if (uniB.simulateStep(1, roll)) {
            wins[1]++;

          } else {
            wins = sumArrays(wins, uniB.simulate());

          }

        }
      }

    }

    multiverse[h] = wins;
    return wins;
  }

  hash() {
    return this.positions.join('.') + '-' + this.scores.join('.');
  }
}
const firstUni = new Universe(startPositions);

const wins = firstUni.simulate();
let betterPlayer = 0;
if (wins[1] > wins[0])
  betterPlayer = 1;

console.log(wins[betterPlayer]);
